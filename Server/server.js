const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectMongoDBSession = require('connect-mongodb-session');
const connectDB = require('./DB/db');
require('dotenv').config();
require('./Passport-Config/passport');
const signupRouter = require('./Routes/signup');
const loginRouter = require('./Routes/login');
const logoutRouter = require('./Routes/logout');
const changePasswordRouter = require('./Routes/changePassword');

const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = process.env.SECRET_KEY;
const mongoURI = process.env.MONGODB_URI;
const MongoDBStore = connectMongoDBSession(session);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(helmet.noSniff());
app.use(helmet.frameguard({ action: "sameorigin" }));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'"],
        scriptSrc: ["'self'"],
    }
}));

const sessionConfig = ({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day 
        sameSite: "none",
        httpOnly: true,
    },
    store: new MongoDBStore({
        uri: mongoURI,
        collection: 'session',
        expires: 1000 * 60 * 60 * 24 * 7, // 1 week
    }),
});

app.use(cookieParser());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/change-password', changePasswordRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
  });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
})