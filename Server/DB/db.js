const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

const client = new MongoClient(mongoURI);
let dbInstance = null;

// Connect to the database
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

// Close the database connection
async function closeDBConnection() {
    try {
        await client.close();
       console.log("Closed MongoDB connection");
    }
    catch (err) {
      console.error("MongoDB close connection error", err);
        throw err;
    }
}

module.exports = {
    connectDB,
    closeDBConnection
};