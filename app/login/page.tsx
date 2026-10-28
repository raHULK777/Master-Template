import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';
import { getSessionToken } from '@/lib/session';

export const dynamic = 'force-dynamic';

const HIGHLIGHTS = [
  'Live project phases and progress from the field',
  'Change orders signed and time-stamped in one place',
  'Every contractor sees only their own workspace',
];

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string; reset?: string }>;
}) {
  const token = await getSessionToken();
  if (token) redirect('/dashboard');

  const { expired, reset } = await searchParams;

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden flex-col justify-between p-10 lg:flex" style={{ background: 'linear-gradient(135deg, #0B1220 0%, #1a2744 100%)', color: 'white' }}>
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-sm font-bold">SC</div>
          <span className="text-sm font-semibold tracking-tight">Santos Construction</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight">Your projects, without the paper trail.</h1>
          <ul className="mt-6 space-y-3 text-sm opacity-80">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs opacity-60">Powered by Santos Construction · Dallas, TX</p>
      </section>

      <section className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#C2410C] text-sm font-bold text-white">SC</div>
              <p className="text-sm font-semibold" style={{ color: '#C2410C' }}>Santos Construction</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Sign in to your workspace</h2>
          <p className="mt-1 text-sm text-slate-500">Santos Construction · secured by your workspace domain</p>

          <div className="mt-6 space-y-4">
            {expired ? (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">Your session expired. Sign in again to continue.</div>
            ) : null}
            {reset ? (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">Password updated. Sign in with your new password.</div>
            ) : null}
            <LoginForm />
            <p className="text-center text-xs text-slate-500">
              Your workspace is determined by the domain you signed in from.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
