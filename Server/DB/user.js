const { connectDB } = require('./db');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
require('../Passport-Config/passport');

// Function to save a new user to the database
async function saveUser(newUser) {
    const db = await connectDB();
    const usersCollection = db.collection('user');
    try {
      const result = await usersCollection.insertOne(newUser);
        return result;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };

// Function to get a user by email from the database
async function getUserByEmail(email) {
    const db = await connectDB();
    const usersCollection = db.collection('user');
    try {
        const user = await usersCollection.findOne({ email: email });
        return user;
    } catch (error) {
        console.error('Error getting user by email:', error);
        throw error;
    }
};

// Function to get a user by ID from the database
async function getUserById(id) {
  const db = await connectDB();
  const usersCollection = db.collection('user');
    try {
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });
        return user;
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error;
    }
};

// Function to get a user by GitHub ID from the database
async function getUserByGitHubId(githubId) {
    const db = await connectDB();
    const usersCollection = db.collection('user');
    try {
      const user = await usersCollection.findOne({ githubId: githubId });
      return user;
    } catch (error) {
      console.error('Error getting user by GitHub ID:', error);
      throw error;
    }
  };

  // Function to get a user by Google ID from the database
async function getUserByGoogleId(googleId) {
    const db = await connectDB();
    const usersCollection = db.collection('user');
    try {
      const user = await usersCollection.findOne({ googleId: googleId });
      return user;
    } catch (error) {
      console.error('Error getting user by Google ID:', error);
      throw error;
    }
  }

// Function to change user password
async function changePassword(id, newPassword) {
    const db = await connectDB();
    const usersCollection = db.collection('user');
    try {
      // Fetch the user's current hashed password from the database
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      if (!user) {
        throw new Error('User not found');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Update the user's password in the database
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { password: hashedPassword } }
      );
      if (result.modifiedCount !== 1) {
        throw new Error('Password update failed');
      }
      return result;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };
  
  // Function to delete a user from the database
    async function deleteUser(id) {
        const db = await connectDB();
        const usersCollection = db.collection('user');
        try {
        const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
        return result;
        } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
        }
    };

module.exports = { 
  saveUser, 
  getUserByEmail,
  getUserById,
  getUserByGitHubId,
  getUserByGoogleId,
  changePassword,
  deleteUser,
  };