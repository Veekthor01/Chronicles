const { ObjectId } = require('mongodb');
const { connectDB } = require('./db');
const { format } = require('date-fns');


// Insert a new blog post
async function insertBlogPost(title, author, authorId, content) {
    const db = await connectDB();
    const blogCollection = db.collection('blogpost');
    const timestamp = format(new Date(), 'do MMMM, yyyy'); // Generate and format the current timestamp
    console.log(timestamp);
    try {
        const result = await blogCollection.insertOne({ title, author, authorId, timestamp, content });
        return result;
    } catch (error) {
        console.error('Error saving post:', error);
    }
};

// Get all blog posts with pagination
async function getBlogPosts(page = 1, limit = 8) {
    const db = await connectDB();
    const blogCollection = db.collection('blogpost');
    try {
        const skip = (page - 1) * limit; // Calculate the number of items to skip
        const posts = await blogCollection.find().skip(skip).limit(limit).toArray();
        return posts;
    } catch (error) {
        console.error('Error getting posts:', error);
    }
};

// Get all blog posts without pagination for search query
async function getAllBlogPosts() {
    const db = await connectDB();
    const blogCollection = db.collection('blogpost');
    try {
        const posts = await blogCollection.find().toArray();
        return posts;
    } catch (error) {
        console.error('Error getting posts:', error);
    }
}

// Calculate the total number of blog posts(used for pagination)
async function getBlogPostCount() {
    const db = await connectDB();
    const blogCollection = db.collection('blogpost');
    try {
        const count = await blogCollection.countDocuments();
        return count;
    } catch (error) {
        console.error('Error getting post count:', error);
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
    const timestamp = format(new Date(), 'do MMMM, yyyy');
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
    getAllBlogPosts,
    getBlogPostCount,
    updateBlogPost,
    deleteBlogPost,
};
