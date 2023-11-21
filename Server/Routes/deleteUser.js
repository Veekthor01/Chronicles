const express = require('express');
const router = express.Router();
const { deleteUser } = require('../DB/user');
const isAuthenticated = require('../Passport-Config/Authenticated');

// DELETE user by ID
router.delete('/:id', isAuthenticated, async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
      // User not found
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

module.exports = router;
