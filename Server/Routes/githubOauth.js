const express = require('express');
const passport = require('passport');

const router = express.Router();

// Github authentication route
router.get('/', 
passport.authenticate('github'));

// Github authentication callback
router.get('/callback',
 passport.authenticate('github', { failureRedirect: '/signup' }),
 function (req, res) {
    res.redirect('http://localhost:3000/User');
});

module.exports = router;