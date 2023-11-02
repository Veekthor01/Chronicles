'use client';
import React, { useState } from "react";
import createPost from './Create-Post/page';

export default function NewBlogPost () {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the createPost function to create a new blog post
      const response = await createPost(title, author, content);
      // Handle success or errors as needed
      if (response) {
        // Blog post was successfully created
        alert('Blog post created successfully');
        // Optionally, redirect to the newly created blog post's page
        // router.push(`/blog/${response._id}`);
      } else {
        // Handle errors or display an error message
        alert('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create blog post');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
    <h1 className="text-2xl font-bold text-center mb-4">Create a New Blog Post</h1>
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="text-gray-600">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full py-2 px-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="text-gray-600">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full py-2 px-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="text-gray-600">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full py-2 px-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:border-indigo-500"
          required
        />
      </div>
      <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">Post</button>
    </form>
  </div>
  
  );
};
