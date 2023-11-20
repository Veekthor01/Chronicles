'use client'
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-800">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-500 dark:text-red-400 mb-4">There was a problem.</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We couldn't find the page you were looking for.
        </p>
        <button
          onClick={() => router.back()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-500"
        >
          Go back
        </button>
      </div>
    </div>
  );
};
