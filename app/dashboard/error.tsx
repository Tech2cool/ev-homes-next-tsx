'use client'; // Required — error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-center">
      <h2 className="text-xl font-semibold text-red-500">Something went wrong 😢</h2>
      <p className="mt-2 text-gray-600 text-sm max-w-md">
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition"
      >
        Try Again
      </button>
    </div>
  );
}
