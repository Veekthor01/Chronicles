'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateComment from "./Create-Comment/page";

// Function to create a new comment
export default function NewComment({ blogPostId }) {
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {  
        // Call the createPost function to create a new blog post
        const response = await CreateComment(author, content, blogPostId );
        if (response) {
          setMessage('Comment created successfully');
          setTimeout(() => {
            setMessage('');
            router.push('/BlogPost');
          }, 3000);
        } else {
          setError('Failed to create comment. Please try again later.');
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
          setError('Failed to create comment. Please try again later.');
          setTimeout(() => setError(''), 5000);
        }
      }
    };
    
    return (
        <div className="max-w-4xl mx-auto p-4">
  <h1 className="text-xl sm:text-2xl font-bold mb-4 tracking-wide">Leave a Reply</h1>
  <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 mb-4 mt-4 rounded-lg shadow-lg">
    <div className="mb-4">
      <label htmlFor="author" className="inline-block mb-1 text-sm font-medium tracking-wide text-gray-900 dark:text-gray-200">Name</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full py-2 px-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-indigo-500"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="content" className="inline-block mb-1 text-sm font-medium tracking-wide text-gray-900 dark:text-gray-200">Comment</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-40 bg-white dark:bg-gray-700 py-3 px-3 rounded-lg border border-gray-300 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-indigo-500"
        required
      />
      {error && <p className="text-red-500 text:sm md:text-base italic mt-2">{error}</p>}
      {message && <p className="text-green-500 text:sm md:text-base italic mt-2">{message}</p>}
    </div>
    <button type="submit" className="bg-indigo-600 tracking-wide text-sm text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">Post Comment</button>
  </form>
</div>
    );
    }