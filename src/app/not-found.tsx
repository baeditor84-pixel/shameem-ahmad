import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="font-heading text-6xl font-extrabold text-brand-navy mb-4">404</h1>
      <h2 className="font-heading text-2xl font-bold text-brand-navy mb-2">Page Not Found</h2>
      <p className="text-brand-muted text-sm max-w-md mb-8">
        The page or specialty route you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 rounded-xl bg-brand-navy text-white text-sm font-semibold hover:bg-brand-navy-light transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Return to Home Page
      </Link>
    </div>
  );
}
