const express = require('express');
const bcrypt = require('bcrypt');
const connectDB = require('../DB/db');

const router = express.Router();

router.get('/', async (req, res) => {
    const { token } = req.query;
    try {
      const db = await connectDB();
      const passwordResetTokens = db.collection('passwordResetTokens');
      const tokenData = await passwordResetTokens.findOne({ token });
      if (!tokenData || new Date() > tokenData.expirationTime) {
        res.status(400).json({ message: 'Invalid or expired token.' });
      } else {
        // Handle successful case
        res.status(200).json({ message: 'Token is valid.', token });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  });  

  router.post('/', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
      const db = await connectDB();
      const passwordResetTokens = db.collection('passwordResetTokens');
      // Find the token in your database
      const tokenData = await passwordResetTokens.findOne({ token });
      if (!tokenData) {
        res.status(400).json({ message: 'Invalid or expired token.' });
        return;
      }
      // Find the user associated with the token
      const usersCollection = db.collection('user');
      // Find the user with the associated user ID
      const user = await usersCollection.findOne({ _id: tokenData.userId });
      if (!user) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }      
      // Hash the new password with bcrypt
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Update the user's password in your database
      await usersCollection.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
      // Remove the used token from your database
      await passwordResetTokens.deleteOne({ token: token });
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  });

module.exports = router;
  