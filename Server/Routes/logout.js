const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logout successful' });
  } 
);

module.exports = router;