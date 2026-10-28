import type { NextResponse } from 'next/server';
import { REFRESH_COOKIE, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, REFRESH_MAX_AGE_SECONDS } from './env';

export interface TokenPair {
  token: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

function maxAgeSeconds(iso: string, fallback: number): number {
  const remaining = Math.floor((new Date(iso).getTime() - Date.now()) / 1000);
  return Number.isFinite(remaining) && remaining > 0 ? remaining : fallback;
}

export function setAuthCookies(response: NextResponse, tokens: TokenPair): void {
  const secure = process.env.COOKIE_SECURE === 'false' ? false : process.env.NODE_ENV === 'production';

  response.cookies.set({
    name: SESSION_COOKIE,
    value: tokens.token,
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    maxAge: maxAgeSeconds(tokens.accessTokenExpiresAt, SESSION_MAX_AGE_SECONDS),
  });

  response.cookies.set({
    name: REFRESH_COOKIE,
    value: tokens.refreshToken,
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    maxAge: maxAgeSeconds(tokens.refreshTokenExpiresAt, REFRESH_MAX_AGE_SECONDS),
  });
}

export function clearAuthCookies(response: NextResponse): void {
  response.cookies.set({ name: SESSION_COOKIE, value: '', path: '/', maxAge: 0 });
  response.cookies.set({ name: REFRESH_COOKIE, value: '', path: '/', maxAge: 0 });
}
