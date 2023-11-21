const express = require('express');
const passport = require('passport');
require("dotenv").config();

const router = express.Router();

const FrontendURL = process.env.FRONTEND_URL;

// Github authentication route
router.get('/', 
passport.authenticate('github'));

// Github authentication callback
router.get('/callback',
passport.authenticate('github', { failureRedirect: `${FrontendURL}/Signup` }),
 function (req, res) {
    res.redirect(`${FrontendURL}/User`);
});

module.exports = router;
