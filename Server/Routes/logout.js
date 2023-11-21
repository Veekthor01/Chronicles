const express = require('express');
const router = express.Router();

// logout user and clear session cookie
router.post('/', (req, res) => {
  req.logout(); // Passport.js logout
  res.clearCookie('connect.sid'); // Clear the session cookie
  req.session.destroy(); // Destroy the session
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;