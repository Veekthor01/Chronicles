const express = require('express');
const router = express.Router();
const { deleteUser } = require('../DB/user');
const isAuthenticated = require('../Passport-Config/Authenticated');

// DELETE user by ID
router.delete('/', isAuthenticated, async (req, res) => {
  const userId = req.user._id; // Get the user ID from the session
  try {
    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
      // User not found
      return res.status(404).json({ message: 'User not found' });
    }
    // Clear the session after deleting the user (optional)
    req.session.user = null;
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

module.exports = router;
