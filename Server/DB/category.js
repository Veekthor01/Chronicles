const { ObjectId } = require('mongodb');
const connectDB = require('./db');

// Insert a new category
async function insertCategory(category) {
    const db = await connectDB();
    const categoryCollection = db.collection('category');
    try {
        const result = await categoryCollection.insertOne({ category });
       return result;
    } catch (error) {
        console.error('Error saving category:', error);
    }
};

// Get all categories
async function getCategories() {
    const db = await connectDB();
    const categoryCollection = db.collection('category');
    try {
        const categories = await categoryCollection.find().toArray();
        return categories;
    } catch (error) {
        console.error('Error getting categories:', error);
    }
};

// Get a category by ID
async function getCategoryById(id) {
    const db = await connectDB();
    const categoryCollection = db.collection('category');
    try {
        const category = await categoryCollection.findOne({ _id: new ObjectId(id) });
        return category;
    } catch (error) {
        console.error('Error getting category:', error);
    }
};

module.exports = {
    insertCategory,
    getCategories,
    getCategoryById
};