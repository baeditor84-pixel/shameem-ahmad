'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center p-6 text-center font-sans">
        <h2 className="text-2xl font-bold text-[#0B2A4A] mb-4">Application Error</h2>
        <p className="text-[#64748B] text-sm max-w-md mb-6">
          A critical error occurred. Click below to reload the application.
        </p>
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-[#14B8A6] text-white text-sm font-semibold shadow hover:bg-[#0D9488] transition-colors"
        >
          Reload Page
        </button>
      </body>
    </html>
  );
}
