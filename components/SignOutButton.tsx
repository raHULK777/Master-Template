'use client';

import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();
  return (
    <form
      action="/api/session"
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await fetch('/api/session', {
          method: 'DELETE',
        });
        if (response.ok) {
          router.replace('/login');
          router.refresh();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        Sign Out
      </button>
    </form>
  );
}
