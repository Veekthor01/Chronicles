const express = require('express');
const passport = require('passport');
const validator = require('validator');
require('../Passport-Config/passport');
const { getUserByEmail } = require('../DB/user');

const router = express.Router();

/* GET route for rendering the signup page
router.get('/', (req, res) => {
    try {
        return res.render('signup');
    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json({ message: 'An error occurred while rendering the signup page.' });
    }
}); */

// POST route for handling the signup form submission
router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    // Validate the user input
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validator.isLength(password, { min: 4 })) {
        return res.status(400).json({ message: 'Password must be at least 4 characters' });
    }
     // Check if the email is already taken
     const user = await getUserByEmail(email);
     if (user) {
         return res.status(400).json({ message: 'Email already taken.' });
     }
    // Pass the request to the authentication middleware
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Signup failed' });
        }
         else {
            return res.status(200).json({ message: 'Signup successful' });
        }
    })(req, res, next);
});

module.exports = router;
