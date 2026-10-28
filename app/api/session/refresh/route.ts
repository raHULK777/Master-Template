import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { REFRESH_COOKIE, SESSION_COOKIE } from '@/lib/env';
import { setAuthCookies, clearAuthCookies } from '@/lib/auth-cookies';
import { SANTOS_USERS } from '@/lib/users';

export async function POST(): Promise<NextResponse> {
  const store = await cookies();
  const refreshToken = store.get(REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token.' }, { status: 401 });
  }

  try {
    const payload = JSON.parse(Buffer.from(refreshToken, 'base64').toString());
    const user = SANTOS_USERS.find((u) => u.id === payload.userId);
    if (!user) {
      const response = NextResponse.json({ error: 'Session expired.' }, { status: 401 });
      clearAuthCookies(response);
      return response;
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 15 * 60 * 1000);
    const refreshExpiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email, role: user.role, exp: expiresAt.getTime() })).toString('base64');
    const newRefreshToken = Buffer.from(JSON.stringify({ userId: user.id, exp: refreshExpiresAt.getTime() })).toString('base64');

    const response = NextResponse.json({ success: true });
    setAuthCookies(response, { token, refreshToken: newRefreshToken, accessTokenExpiresAt: expiresAt.toISOString(), refreshTokenExpiresAt: refreshExpiresAt.toISOString() });
    return response;
  } catch {
    const response = NextResponse.json({ error: 'Invalid refresh token.' }, { status: 401 });
    clearAuthCookies(response);
    return response;
  }
}
