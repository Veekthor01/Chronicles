'use client'
 
// Function to handle errors in root components
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-800">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-red-500 dark:text-red-400 mb-4">
      Oops! Something went wrong!
      </h2>
        <button onClick={() => reset()}
        className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-500"
        >
            Try again
        </button>
    </div>
    </div>
      </body>
    </html>
  )
}