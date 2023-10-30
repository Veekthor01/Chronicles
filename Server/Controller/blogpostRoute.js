const express = require('express');
const router = express.Router();
const { insertBlogPost, getBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost, } = require('../DB/blogpost');
const { getCommentsByBlogPostId } = require('../DB/comment');

// Get all blog posts
router.get('/', async (req, res) => {
    try {
      const blogPosts = await getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve blog posts', error: error.message });
    }
  });

    // Get a specific blog post by ID with comments
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const blogPost = await getBlogPostById(id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found.' });
        }
        // Fetch comments associated with the blog post
        const comments = await getCommentsByBlogPostId(id);
        blogPost.comments = comments; // Add comments to the blog post object
        res.json(blogPost);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve blog post', error: error.message });
    }
  });

// Create a new blog post
router.post('/', async (req, res) => {
    const { title, author, content } = req.body;
    if (!title || !author || !content) {
      return res.status(400).json({ message: 'Title, author, and content are required.' });
    }
    try {
      const result = await insertBlogPost(title, author, content);
      res.json({ message: 'Blog post created successfully', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create blog post', error: error.message });
    }
  });

// Update a blog post
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, content } = req.body;
  if (!title || !author || !content) {
      return res.status(400).json({ message: 'Title, author, and content are required.' });
  }
  try {
      const result = await updateBlogPost(id, title, author, content);
      if (result.modifiedCount === 0) {
          return res.status(404).json({ message: 'Blog post not found.' });
      }
      res.json({ message: 'Blog post updated successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to update blog post', error: error.message });
  }
});
  
  // Delete a blog post
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await deleteBlogPost(id);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Blog post not found.' });
      }
      res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete blog post', error: error.message });
    }
  });

module.exports = router;
