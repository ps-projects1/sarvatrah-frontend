/**
 * Secure API client with error handling and request interceptors
 */

import { ClientRateLimiter } from './security';

// Rate limiter instance (10 requests per minute per endpoint)
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

/**
 * Secure fetch wrapper with timeout, error handling, and security checks
 */
async function secureFetch(
  url: string,
  config: RequestConfig = {}
): Promise<Response> {
  const { params, timeout = 30000, ...fetchConfig } = config;

  // Build URL with query parameters
  let fullUrl = url;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    fullUrl = `${url}?${searchParams.toString()}`;
  }

  // Rate limiting check
  const endpoint = new URL(fullUrl, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3232').pathname;
  if (!rateLimiter.canMakeRequest(endpoint)) {
    throw new ApiError('Too many requests. Please try again later.', 429, 'Too Many Requests');
  }

  // Set default headers
  const headers = new Headers(fetchConfig.headers);
  if (!headers.has('Content-Type') && fetchConfig.method !== 'GET') {
    headers.set('Content-Type', 'application/json');
  }

  // Add request ID for tracking
  headers.set('X-Request-ID', crypto.randomUUID());

  // Timeout implementation
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(fullUrl, {
      ...fetchConfig,
      headers,
      signal: controller.signal,
      credentials: 'same-origin', // Security: Don't send credentials cross-origin
    });

    clearTimeout(timeoutId);

    // Handle HTTP errors
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

/**
 * API client with security best practices
 */
export const apiClient = {
  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
    const response = await secureFetch(url, { method: 'GET', params });
    return response.json();
  },

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
    const response = await secureFetch(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
    const response = await secureFetch(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
    const response = await secureFetch(url, { method: 'DELETE' });
    return response.json();
  },

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`;
    const response = await secureFetch(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },
};

/**
 * Form data helper for file uploads
 */
export async function uploadFile(
  endpoint: string,
  file: File,
  additionalData?: Record<string, string>
): Promise<unknown> {
  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new ApiError('File size exceeds 10MB limit', 413, 'Payload Too Large');
  }

  // Validate file type
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

/**
 * Retry failed requests with exponential backoff
 */
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

      // Don't retry on client errors (4xx) except 429 (rate limit)
      if (error instanceof ApiError && error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}
