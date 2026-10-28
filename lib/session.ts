import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE } from './env';

export async function getSessionToken(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return token && token.length > 0 ? token : null;
}

export async function requireSessionToken(): Promise<string> {
  const token = await getSessionToken();
  if (!token) redirect('/login');
  return token;
}
