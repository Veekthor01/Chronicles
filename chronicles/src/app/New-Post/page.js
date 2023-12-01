'use client';
import{ useState, useEffect } from "react";
import createPost from './Create-Post/page';
import { useRouter } from 'next/navigation';
import { checkIsAuthenticated } from "../../../utils/auth";

// Function to create a new blog post
export default function NewBlogPost () {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const redirectToLogin = async () => {
      const isAuthenticated = await checkIsAuthenticated();

      if (!isAuthenticated) {
        router.push('/Login');
      }
    }

    redirectToLogin();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the createPost function to create a new blog post
      const response = await createPost(title, author, content);
      // Handle success or errors as needed
      if (response) {
        setMessage('Blog post created successfully');
        setTimeout(() => {
          setMessage('');
          router.push('/BlogPost');
        }, 3000);
      } else {
        setError('Failed to create blog post');
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      console.error('Error:', error);

      if (error.message === '401') {
        setError('Unauthorized. Please login.');
        setTimeout(() => setError(''), 5000);
      } else if (error.message === '400') {
        setError('Invalid request. Please provide title, author, and content.');
        setTimeout(() => setError(''), 5000);
      } else {
        setError('Failed to create blog post. Please try again later.');
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 mb-4 mt-4 rounded-lg shadow-lg">
      <div className="flex justify-center sm:justify-between items-center mb-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Share your story</h1>
      <button type="submit" className="hidden sm:block bg-indigo-600 text-sm text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
          Publish
        </button>
      </div>
      {error && <p className="text-red-500 text:sm md:text-base italic mt-2">{error}</p>}
      {message && <p className="text-green-500 text:sm md:text-base italic mt-2">{message}</p>}
        <div className="mb-8 mt-2">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full py-3 px-3 bg-white dark:bg-gray-700 rounded-lg tracking-wide text-gray-900 dark:text-gray-200 focus:outline-none border border-gray-300 focus:border-indigo-700 dark:border-0"
            required
          />
        </div>
        <div className="mb-8">
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Name"
            className="w-full py-3 px-3 bg-white dark:bg-gray-700 rounded-lg tracking-wide text-gray-900 dark:text-gray-200 focus:outline-none border border-gray-300 focus:border-indigo-700 dark:border-0"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full h-44 bg-white dark:bg-gray-700 py-3 px-3 rounded-lg tracking-wide text-gray-900 dark:text-gray-200 focus:outline-none border border-gray-300 focus:border-indigo-700 dark:border-0"
            required
          />
        </div>
        <div className="sm:hidden">
        <button type="submit" className="mt-4 bg-indigo-600 text-sm text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
          Publish
        </button>
      </div>
      </form>
    </div>
  );
};
