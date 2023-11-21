const express = require('express');
const router = express.Router();
const { insertBlogPost, getBlogPosts, getBlogPostById, getBlogPostCount, updateBlogPost, deleteBlogPost,
getAllBlogPosts, getBlogPostsBySearchQuery } = require('../DB/blogpost');
const { getCommentsByBlogPostId } = require('../DB/comment');
const isAuthenticated = require('../Passport-Config/Authenticated');

// Get all blog posts with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page parameter from the query or default to 1
  const limit = parseInt(req.query.limit) || 1; // Get the limit parameter from the query or default to 10
    try {
      const blogPosts = await getBlogPosts(page, limit);
      const count = await getBlogPostCount();
      res.json({ blogPosts, count });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve blog posts', error: error.message });
    }
  });

  // Get all blog posts without pagination for search query
router.get('/search', async (req, res) => {
  try {
    const blogPosts = await getAllBlogPosts();
    res.json({ blogPosts });
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
router.post('/', isAuthenticated,  async (req, res) => {
    const { title, author, content } = req.body;
    const user = req.user; // Assuming that your authentication middleware sets the user object
    if (!user) {
    return res.status(401).json({ message: 'User not authenticated.' });
    }
    const authorId = user._id; // Set the authorId to the user's _id
    if (!title || !author || !content) {
      return res.status(400).json({ message: 'Title, author, and content are required.' });
    }
    try {
      const result = await insertBlogPost(title, author, authorId, content);
      res.json({ message: 'Blog post created successfully', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create blog post', error: error.message });
    }
  });

// Update a blog post
router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { title, author, content } = req.body;
  if (!title || !author || !content) {
    return res.status(400).json({ message: 'Title, author, and content are required.' });
  }
  try {
    // Fetch the blog post to check its authorId
    const blogPost = await getBlogPostById(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }
    // Check if the user making the request is the author of the post
    if (blogPost.authorId.equals(req.user._id)) {
      const result = await updateBlogPost(id, title, author, content);
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Blog post not found.' });
      }
      return res.json({ message: 'Blog post updated successfully' });
    } else {
      return res.status(403).json({ message: 'Unauthorized - You are not the author of this post.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog post', error: error.message });
  }
});

// Delete a blog post
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the blog post to check its author
    const blogPost = await getBlogPostById(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }
    // Check if the user making the request is the author of the post
    if (blogPost.authorId.equals(req.user._id)) {
      const result = await deleteBlogPost(id);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Blog post not found.' });
      }
      return res.json({ message: 'Blog post deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Unauthorized - You are not the author of this post.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog post', error: error.message });
  }
});

module.exports = router;
