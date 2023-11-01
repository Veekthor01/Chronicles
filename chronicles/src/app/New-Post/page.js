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
    <div>
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-black"
          required
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="text-black"
          required
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-black"
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};
