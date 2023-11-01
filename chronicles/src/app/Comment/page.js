'use client';
import React, { useState } from "react";
import CreateComment from "./Create-Comment/page";

export default function NewComment({ blogPostId }) {
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {  
        // Call the createPost function to create a new blog post
        const response = await CreateComment(author, content, blogPostId );
        // Handle success or errors as needed
        if (response) {
            // Blog post was successfully created
            alert("Comment created successfully");
            // Optionally, redirect to the newly created blog post's page
           // router.push(`/blogpost/${blogId}`);
        } else {
            // Handle errors or display an error message
            alert("Failed to create comment");
        }
        } catch (error) {
        console.error("Error:", error);
        alert("Failed to create comment");
        }
    };
    
    return (
        <div>
        <h1>Create a New Comment</h1>
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
        </form>
        </div>
    );
    }