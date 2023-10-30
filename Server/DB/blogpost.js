const { ObjectId } = require('mongodb');
const connectDB = require('./db');

// Insert a new blog post
async function insertBlogPost(title, author, content) {
    const db = await connectDB();
    const blogCollection = db.collection('blogpost');
    const timestamp = new Date(); // Generate the current timestamp
    try {
        const result = await blogCollection.insertOne({ title, author, timestamp, content });
        return result;
    } catch (error) {
        console.error('Error saving post:', error);
    }
};

// Get all blog posts
async function getBlogPosts() {
    const db = await connectDB();
    const blogCollection = db.collection('blogpost');
    try {
        const posts = await blogCollection.find().toArray();
        return posts;
    } catch (error) {
        console.error('Error getting posts:', error);
    }
};

// Get a blog post by ID
async function getBlogPostById(id) {
    const db = await connectDB();
    const blogCollection = db.collection('blogpost');
    try {
        const post = await blogCollection.findOne({ _id: new ObjectId(id) });
        return post;
    } catch (error) {
        console.error('Error getting post:', error);
    }
};

// Update a blog post
async function updateBlogPost(id, title, author, content) {
    const db = await connectDB();
    const blogCollection = db.collection('blogpost');
    const timestamp = new Date(); // Generate the current timestamp
    try {
        const result = await blogCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, author, timestamp, content } }
        );
        return result;
    } catch (error) {
        console.error('Error updating post:', error);
    }
};

// Delete a blog post
async function deleteBlogPost(id) {
    const db = await connectDB();
    const blogCollection = db.collection('blogpost');
    try {
        const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

module.exports = {
    insertBlogPost,
    getBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
};
