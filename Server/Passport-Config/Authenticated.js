function isAuthenticated(req, res, next) {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
        // If user is authenticated, allow them to proceed
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = isAuthenticated;
