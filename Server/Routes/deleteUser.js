const express = require('express');
const router = express.Router();
const { deleteUser } = require('../DB/user');

// DELETE user by ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    // Call the deleteUser function to delete the user
    await deleteUser(userId);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to delete user' });
  }
});

module.exports = router;
