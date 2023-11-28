'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateComment from "./Create-Comment/page";
//import { checkIsAuthenticated } from "../../../utils/auth";

export default function NewComment({ blogPostId }) {
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    /*useEffect(() => {
      const redirectToLogin = async () => {
        const isAuthenticated = await checkIsAuthenticated();
  
        if (!isAuthenticated) {
          router.push('/Login');
        }
      }

      redirectToLogin();
    }, [router]); */
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {  
        // Call the createPost function to create a new blog post
        const response = await CreateComment(author, content, blogPostId );
        // Handle success or errors as needed
        if (response) {
          alert('Comment created successfully');
          router.push(`/BlogPost/${blogPostId}`);
        } else {
          alert('Failed to create comment');
        }
      } catch (error) {
        console.error('Error:', error);
        
        if (error.message === '401') {
          alert('User not authenticated. Please log in.');
        } else if (error.message === '400') {
          alert('Invalid request. Please provide title, author, and content.');
        } else {
          alert('Failed to create comment');
        }
      }
    };
    
    return (
        <div className="max-w-4xl mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4 tracking-wide">Leave a Reply</h1>
  <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 mb-4 mt-4 rounded-lg shadow-xl">
    <div className="mb-4">
      <label htmlFor="author" className="inline-block mb-1 text-sm font-medium tracking-wide text-gray-900 dark:text-gray-200">Name</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full py-3 px-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-indigo-500"
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
    </div>
    <button type="submit" className="bg-indigo-600 tracking-wide text-sm text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">Post Comment</button>
  </form>
</div>
    );
    }