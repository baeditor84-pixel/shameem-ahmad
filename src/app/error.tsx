'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-heading text-2xl font-bold text-brand-navy mb-4">Something went wrong!</h2>
      <p className="text-brand-muted text-sm max-w-md mb-6">
        An unexpected error occurred. Please try reloading or return to the home page.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-brand-teal text-white text-sm font-semibold shadow hover:bg-brand-teal-dark transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-brand-navy text-white text-sm font-semibold hover:bg-brand-navy-light transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
