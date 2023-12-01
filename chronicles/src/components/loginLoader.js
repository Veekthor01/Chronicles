// Loading component for switching from signup to login route
export default function LoadingOverlay({ message }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-900 bg-opacity-50 text-white text-2xl">
        <div className="text-center">
          <h2 className="text-lg md:text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">{message}</h2>
        </div>
      </div>
    );
  }