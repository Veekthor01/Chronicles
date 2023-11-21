const express = require('express');
const crypto = require('crypto');
const { connectDB } = require('../DB/db');
const transporter = require('../Email/email');
require("dotenv").config();

const router = express.Router();

const FrontendURL = process.env.FRONTEND_URL;
const myEmail = process.env.EMAIL_HOST_USER;

// Function to generate a unique token to be sent by email to the user for password reset
function generateToken() {
    return crypto.randomBytes(20).toString('hex');
  }

  router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: 'Request was successful.' });
    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).send('An error occurred while processing your request.');
    }
});

router.post('/', async (req, res) => {
    const { email } = req.body;
    try {
      const db = await connectDB();
      const usersCollection = db.collection('user');
      // Find the user with the specified email
      const user = await usersCollection.findOne({ email });
      if (!user) {
       res.status(404).json({ message: 'User not found.' });
        return;
      }
      // Generate a unique token with an expiration time
      const token = generateToken();
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 1);
      // Create a collection to store the password reset tokens
      const passwordResetTokensCollection = db.collection('passwordResetTokens');
      // Store the password reset token with its expiration time in your database
      await passwordResetTokensCollection.insertOne({ token, userId: user._id, expirationTime });
      // Create a password reset link
      const resetLink = `${FrontendURL}/ResetPassword?token=${token}`;
      // Send an email with the reset link
      const mailOptions = {
        from: myEmail,
        to: email,
        subject: 'Password Reset',
        text: `Click this link to reset your password: ${resetLink}`,
      };
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email could not be sent:', error);
          res.status(500).json({ message: 'Email could not be sent.' });
        } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ message: 'Check your email for a password reset link.' });
        }
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  });

module.exports = router;