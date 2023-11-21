const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Check if the user is authenticated based on your session implementation
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

module.exports = router;
