import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { setAuthCookies, clearAuthCookies } from '@/lib/auth-cookies';
import { SESSION_COOKIE, REFRESH_COOKIE } from '@/lib/env';
import { SANTOS_USERS, SANTOS_HASH } from '@/lib/users';

interface LoginRequest {
  email?: string;
  password?: string;
}

interface LoginResponse {
  success: boolean;
  user?: { id: string; email: string; role: string };
  token?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: string;
  refreshTokenExpiresAt?: string;
  error?: string;
}

export async function POST(request: Request): Promise<NextResponse<LoginResponse>> {
  let body: LoginRequest | null = null;
  try {
    body = (await request.json()) as LoginRequest;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Request body must be valid JSON.' },
      { status: 400 },
    );
  }

  if (typeof body?.email !== 'string' || typeof body?.password !== 'string') {
    return NextResponse.json(
      { success: false, error: 'Email and password are required.' },
      { status: 400 },
    );
  }

  const user = SANTOS_USERS.find((u) => u.email === body.email);
  if (!user || SANTOS_HASH(body.password, user.salt) !== user.passwordHash) {
    return NextResponse.json(
      { success: false, error: 'Invalid credentials.' },
      { status: 401 },
    );
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes
  const refreshExpiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email, role: user.role, exp: expiresAt.getTime() })).toString('base64');
  const refreshToken = Buffer.from(JSON.stringify({ userId: user.id, exp: refreshExpiresAt.getTime() })).toString('base64');

  const response = NextResponse.json({ success: true });
  setAuthCookies(response, {
    token,
    refreshToken,
    accessTokenExpiresAt: expiresAt.toISOString(),
    refreshTokenExpiresAt: refreshExpiresAt.toISOString(),
  });

  return response;
}

export async function DELETE(): Promise<NextResponse> {
  const store = await cookies();
  const refreshToken = store.get(REFRESH_COOKIE)?.value ?? null;
  const accessToken = store.get(SESSION_COOKIE)?.value ?? null;

  const response = NextResponse.json({ success: true });
  clearAuthCookies(response);
  return response;
}
