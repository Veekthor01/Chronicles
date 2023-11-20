'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-4">
      Oops! Something went wrong!
      </h2>
      <button onClick={() => reset()}
        className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-500"
      >
        Try again
      </button>
    </div>
    </div>
  )
}