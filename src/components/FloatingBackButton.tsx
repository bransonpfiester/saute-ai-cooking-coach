'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FloatingBackButtonProps {
  href?: string;
  label?: string;
}

export default function FloatingBackButton({ 
  href = '/', 
  label = 'Back to Skills' 
}: FloatingBackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href === 'back') {
      router.back();
    }
  };

  if (href === 'back') {
    return (
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 z-40 flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 font-medium transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        aria-label={label}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">{label}</span>
      </button>
    );
  }

  return (
    <Link
      href={href}
      className="fixed top-4 left-4 z-40 flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 font-medium transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
      aria-label={label}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
