import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE, REFRESH_COOKIE } from '@/lib/env';
import { SANTOS_USERS, SANTOS_HASH } from '@/lib/users';
import { setAuthCookies, clearAuthCookies } from '@/lib/auth-cookies';

interface TokenPair {
  token: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: { email?: unknown; password?: unknown } | null = null;
  try {
    body = (await request.json()) as { email?: unknown; password?: unknown };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (typeof body?.email !== 'string' || typeof body?.password !== 'string') {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const user = SANTOS_USERS.find((u) => u.email === body.email);
  if (!user || SANTOS_HASH(body.password, user.salt) !== user.passwordHash) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000);
  const refreshExpiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email, role: user.role, exp: expiresAt.getTime() })).toString('base64');
  const refreshToken = Buffer.from(JSON.stringify({ userId: user.id, exp: refreshExpiresAt.getTime() })).toString('base64');

  const response = NextResponse.json({ success: true });
  setAuthCookies(response, { token, refreshToken, accessTokenExpiresAt: expiresAt.toISOString(), refreshTokenExpiresAt: refreshExpiresAt.toISOString() });
  return response;
}

export async function DELETE(): Promise<NextResponse> {
  const store = await cookies();
  const response = NextResponse.json({ success: true });
  clearAuthCookies(response);
  return response;
}
