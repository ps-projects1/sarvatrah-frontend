/**
 * Security utilities for input validation and sanitization
 */

/**
 * Sanitize user input to prevent XSS attacks
 * @param input - User input string
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';

  // Remove potential script tags and dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (basic validation)
 * @param phone - Phone number to validate
 * @returns Boolean indicating if phone is valid
 */
export function isValidPhone(phone: string): boolean {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  // Check if it has 10-15 digits
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns Boolean indicating if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Sanitize file name to prevent path traversal attacks
 * @param filename - File name to sanitize
 * @returns Sanitized filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '_')
    .replace(/^\.+/, '')
    .substring(0, 255);
}

/**
 * Validate and sanitize search query
 * @param query - Search query string
 * @returns Sanitized query
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';

  // Limit length
  const maxLength = 200;
  const trimmed = query.trim().substring(0, maxLength);

  // Remove special characters that could be used for injection
  return trimmed
    .replace(/[<>{}[\]\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Validate pagination parameters
 * @param page - Page number
 * @param limit - Items per page
 * @returns Validated and bounded parameters
 */
export function validatePagination(page?: number, limit?: number) {
  const validPage = Math.max(1, Math.min(page || 1, 1000));
  const validLimit = Math.max(1, Math.min(limit || 20, 100));

  return { page: validPage, limit: validLimit };
}

/**
 * Check if string contains potential SQL injection patterns
 * @param input - Input string to check
 * @returns Boolean indicating if suspicious patterns found
 */
export function hasSqlInjectionPattern(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
    /(--)|;|\/\*|\*\/|xp_|sp_/gi,
    /(\bOR\b.*=.*)|(\bAND\b.*=.*)/gi,
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Rate limiting helper (client-side tracking)
 * This should be complemented with server-side rate limiting
 */
export class ClientRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canMakeRequest(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];

    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}

/**
 * Secure random string generator
 * @param length - Length of random string
 * @returns Random string
 */
export function generateSecureRandomString(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate date input to prevent injection
 * @param dateString - Date string to validate
 * @returns Boolean indicating if date is valid
 */
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Sanitize HTML content (basic implementation)
 * For production, consider using DOMPurify
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML
 */
export function sanitizeHtml(html: string): string {
  // This is a basic implementation
  // For production with rich content, use DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '');
}

/**
 * Check if request origin is allowed
 * @param origin - Request origin
 * @param allowedOrigins - List of allowed origins
 * @returns Boolean indicating if origin is allowed
 */
export function isAllowedOrigin(origin: string, allowedOrigins: string[]): boolean {
  return allowedOrigins.includes(origin) ||
         allowedOrigins.some(allowed => origin.endsWith(allowed));
}
