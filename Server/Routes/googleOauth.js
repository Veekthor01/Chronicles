const express = require('express');
const passport = require('passport');

const router = express.Router();

// Google authentication route
router.get('/',
 passport.authenticate('google', { scope: ['profile'] }));

// Google authentication callback
router.get('/callback', 
passport.authenticate('google', { failureRedirect: 'http://localhost:3000/Signup' }),
 function (req, res) {
  res.redirect('http://localhost:3000/User');
});

module.exports = router;
