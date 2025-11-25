import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Additional runtime security headers
  response.headers.set('X-Request-ID', crypto.randomUUID());

  // Rate limiting hint (actual implementation should be on backend)
  const ip = request.headers.get('x-forwarded-for') ??
             request.headers.get('x-real-ip') ??
             'unknown';
  response.headers.set('X-Client-IP', ip);

  return response;
}

// Configure which routes use the middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
