const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('validator');
require('../Passport-Config/passport');
const { changePassword } = require('../DB/user');
const isAuthenticated = require('../Passport-Config/Authenticated');

const router = express.Router();

router.put('/', isAuthenticated, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = req.user; // Assuming you have the user object available in req.user
    try {
        // Verify the current password
        if (user) {
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Current password is incorrect.' });
        }}
        // Validate the new password
        if (!validator.isLength(newPassword, { min: 4 })) {
            return res.status(400).json({ message: 'Password must be at least 4 characters' });
        }
        // Call the changePassword function to update the password
        await changePassword(user._id, currentPassword, newPassword);
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Failed to change password' });
    }
});


module.exports = router;
