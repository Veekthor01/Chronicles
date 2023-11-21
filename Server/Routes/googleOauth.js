const express = require('express');
const passport = require('passport');
require("dotenv").config();

const router = express.Router();

const FrontendURL = process.env.FRONTEND_URL;

// Google authentication route
router.get('/',
 passport.authenticate('google', { scope: ['profile'] }));

// Google authentication callback
router.get('/callback', 
passport.authenticate('google', { failureRedirect: `${FrontendURL}/Signup` }),
 function (req, res) {
  res.redirect(`${FrontendURL}/User`);
});

module.exports = router;
