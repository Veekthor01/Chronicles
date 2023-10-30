const { ObjectId } = require('mongodb');
const connectDB = require('./db');

// Insert a new comment
async function insertComment(author, content, blogPostId) {
    const db = await connectDB();
    const commentCollection = db.collection('comment');
    const timestamp = new Date(); // Generate the current timestamp
    try {
        const result = await commentCollection.insertOne({ author, timestamp, content, blogPostId });
       return result;
    } catch (error) {
        console.error('Error saving comment:', error);
    }
};

// Get all comments
async function getComments() {
    const db = await connectDB();
    const commentCollection = db.collection('comment');
    try {
        const comments = await commentCollection.find().toArray();
        return comments;
    } catch (error) {
        console.error('Error getting comments:', error);
    }
};

// Get all comments for a blog post
async function getCommentsByBlogPostId(blogPostId) {
    const db = await connectDB();
    const commentCollection = db.collection('comment');
    try {
        const comments = await commentCollection.find({ blogPostId: blogPostId }).toArray();
        return comments;
    } catch (error) {
        console.error('Error getting comments:', error);
        throw error;
    }
};

// Get a comment by ID
async function getCommentById(id) {
    const db = await connectDB();
    const commentCollection = db.collection('comment');
    try {
        const comment = await commentCollection.findOne({ _id: new ObjectId(id) });
        return comment;
    } catch (error) {
        console.error('Error getting comment:', error);
    }
};

// Update a comment
async function updateComment(id, content) {
    const db = await connectDB();
    const commentCollection = db.collection('comment');
    const timestamp = new Date(); // Generate the current timestamp
    try {
        const result = await commentCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { timestamp, content } }
        );
        return result;
    } catch (error) {
        console.error('Error updating comment:', error);
    }
};

// Delete a comment
async function deleteComment(id) {
    const db = await connectDB();
    const commentCollection = db.collection('comment');
    try {
        const result = await commentCollection.deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
};

module.exports = {
    insertComment,
    getComments,
    getCommentById,
    updateComment,
    deleteComment,
    getCommentsByBlogPostId
};