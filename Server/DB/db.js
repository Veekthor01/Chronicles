const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

const client = new MongoClient(mongoURI);
let dbInstance = null;

async function connectDB () {
    try {
        if (!dbInstance) {
            await client.connect();
            dbInstance = client.db();
            console.log('Connected to database.');
        };
        return dbInstance;
    } catch (err) {
        console.log('Database Connection Error', err);
        throw err;
    };
};

module.exports = connectDB;