const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../DB/user');
require('../Passport-Config/passport');

const router = express.Router();

/*router.get('/', (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).send('An error occurred while rendering the login page.');
    }
}); */

// POST route for handling the login form submission
router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
     // Check if the email is correct or exists in the database
    const user = await getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Incorrect email' });
      }
      // if email is correct or exists, Check if the password is correct
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Incorrect password' });
        }}
      // pass the request to the authentication middleware
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Handle any errors that occurred during login
            return res.status(500).json({ message: 'Login failed' });
        } else {
            // Login was successful, use req.login() to establish the session
            req.login(user, (err) => {
                if (err) {
                    // Handle the error if the session could not be established
                    console.error('Error logging in:', err);
                    return res.status(500).json({ message: 'Error logging in' });
                } else {
                    // Set the user object on the session
                    req.session.user = user;
                    // Login was successful
                    return res.status(200).json({ message: 'Login successful' });
                }
            });
        }
    })(req, res, next);
});
 

module.exports = router;