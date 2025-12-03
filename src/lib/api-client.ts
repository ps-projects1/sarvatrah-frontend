import { ClientRateLimiter } from './security';

const rateLimiter = new ClientRateLimiter(10, 60000);

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

async function secureFetch(
  url: string,
  config: RequestConfig = {}
): Promise<Response> {
  const { params, timeout = 30000, ...fetchConfig } = config;

  let fullUrl = url;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    fullUrl = `${url}?${searchParams.toString()}`;
  }

  const endpoint = new URL(fullUrl, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3232').pathname;
  if (!rateLimiter.canMakeRequest(endpoint)) {
    throw new ApiError('Too many requests. Please try again later.', 429, 'Too Many Requests');
  }

  const headers = new Headers(fetchConfig.headers);
  if (!headers.has('Content-Type') && fetchConfig.method !== 'GET') {
    headers.set('Content-Type', 'application/json');
  }

  headers.set('X-Request-ID', crypto.randomUUID());

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(fullUrl, {
      ...fetchConfig,
      headers,
      signal: controller.signal,
      credentials: 'same-origin',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, 'Request Timeout');
      }
      throw new ApiError(error.message, 0, 'Network Error');
    }

    throw new ApiError('Unknown error occurred', 0, 'Unknown Error');
  }
}

export const apiClient = {
  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
    const response = await secureFetch(url, { method: 'GET', params });
    return response.json();
  },

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
    const response = await secureFetch(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
    const response = await secureFetch(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
    const response = await secureFetch(url, { method: 'DELETE' });
    return response.json();
  },

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
    const response = await secureFetch(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },
};

export async function uploadFile(
  endpoint: string,
  file: File,
  additionalData?: Record<string, string>
): Promise<unknown> {
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new ApiError('File size exceeds 10MB limit', 413, 'Payload Too Large');
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new ApiError('Invalid file type', 400, 'Bad Request');
  }

  const formData = new FormData();
  formData.append('file', file);

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
  const response = await secureFetch(url, {
    method: 'POST',
    body: formData,
  });

  return response.json();
}

export async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');

      if (error instanceof ApiError && error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }

      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}
