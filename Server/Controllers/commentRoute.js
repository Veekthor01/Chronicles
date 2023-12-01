const express = require('express');
const router = express.Router();
const { insertComment, getComments, getCommentById, updateComment, deleteComment, } = require('../DB/comment');
const isAuthenticated = require('../Passport-Config/Authenticated');
const limiter = require('../Routes/rateLimiter');

// Get all comments
router.get('/', async (req, res) => {
    try {
      const comments = await getComments();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve comments', error: error.message });
    }
  });

  // Get a specific comment by ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await getCommentById(id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve comment', error: error.message });
    }
  });

// Create a new comment with the associated blog post ID
router.post('/', isAuthenticated, limiter, async (req, res) => {
  const { author, content, blogPostId } = req.body;
  if (!author || !content || !blogPostId) {
      return res.status(400).json({ message: 'Author, content, and blogPostId are required.' });
  }
  try {
      const result = await insertComment(author, content, blogPostId);
      res.json({ message: 'Comment created successfully', data: result });
  } catch (error) {
      res.status(500).json({ message: 'Failed to create comment', error: error.message });
  }
});

// Update a comment
router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;
  if (!author || !content) {
    return res.status(400).json({ message: 'Author and content are required.' });
  }
  try {
    // Fetch the comment to check its author
    const comment = await getCommentById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }
    // Check if the user making the request is the author of the comment
    if (comment.author === req.user._id) {
      const result = await updateComment(id, author, content);
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
      return res.json({ message: 'Comment updated successfully' });
    } else {
      return res.status(403).json({ message: 'Unauthorized - You are not the author of this comment.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment', error: error.message });
  }
});

// Delete a comment
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the comment to check its author
    const comment = await getCommentById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }
    // Check if the user making the request is the author of the comment
    if (comment.author === req.user._id) {
      const result = await deleteComment(id);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
      return res.json({ message: 'Comment deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Unauthorized - You are not the author of this comment.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error: error.message });
  }
});

module.exports = router;