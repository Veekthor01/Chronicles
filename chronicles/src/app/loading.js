// Loading component for all routes
export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">Loading...</h2>
         <p className="text-gray-900 dark:text-gray-200">This may take a few seconds.</p>
        </div>
        </div>
    )
  };