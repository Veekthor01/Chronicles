'use client';
import{ useState, useEffect } from "react";
import createPost from './Create-Post/page';
import { useRouter } from 'next/navigation';
import Footer from "../../components/Footer";
import { checkIsAuthenticated } from "../../../utils/auth";

export default function NewBlogPost () {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
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
        alert('Blog post created successfully');
        router.push('/BlogPost');
      } else {
        alert('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error:', error);

      if (error.message === '401') {
        alert('User not authenticated. Please log in.');
      } else if (error.message === '400') {
        alert('Invalid request. Please provide title, author, and content.');
      } else {
        alert('Failed to create blog post');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 mb-4 mt-4 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold mb-4">Share your story</h1>
      <button type="submit" className="bg-indigo-600 text-sm text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
          Publish
        </button>
      </div>
        <div className="mb-4">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full py-3 px-3 bg-white dark:bg-gray-700 rounded-lg tracking-wide text-gray-900 dark:text-gray-200 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Name"
            className="w-full py-3 px-3 bg-white dark:bg-gray-700 rounded-lg tracking-wide text-gray-900 dark:text-gray-200 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full h-44 bg-white dark:bg-gray-700 py-3 px-3 rounded-lg tracking-wide text-gray-900 dark:text-gray-200 focus:outline-none"
            required
          />
        </div>
      </form>
      <Footer />
    </div>
  );
};
