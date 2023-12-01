const rateLimit = require('express-rate-limit');
const RateLimitMongo = require('rate-limit-mongo');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

// Rate limiter middleware
const limiter = rateLimit({
    store: new RateLimitMongo({
        uri: mongoURI,
        collectionName: 'rate-limit',
        expireTimeMs: 15 * 60 * 1000, // 15 minutes
        resetExpireDateOnChange: true,
        errorHandler: console.error.bind(null, 'rate-limit-mongo'),
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs set to 100
    headers: true,
    handler: function (req, res) {
        res.status(429).json({ message: "You have exceeded your request limit. Please try again later." });
    },
});

module.exports = limiter;