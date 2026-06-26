import { NextRequest } from 'next/server';

export function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD not set in environment variables');
    return false;
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.substring(7);
  return token === adminPassword;
}

export function createAuthResponse(message: string = 'Unauthorized') {
  return Response.json(
    { error: message },
    { status: 401, headers: { 'WWW-Authenticate': 'Bearer' } }
  );
}
