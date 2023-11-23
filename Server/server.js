const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectMongoDBSession = require('connect-mongodb-session');
const { connectDB, closeDBConnection } = require('./DB/db');
require('dotenv').config();
require('./Passport-Config/passport');
require('./Passport-Config/passportOauth');
const signupRouter = require('./Routes/signup');
const loginRouter = require('./Routes/login');
const logoutRouter = require('./Routes/logout');
const changePasswordRouter = require('./Routes/changePassword');
const deleteUserRouter = require('./Routes/deleteUser');
const blogpostRouter = require('./Controllers/blogpostRoute');
const searchBlogPostRouter = require('./Controllers/blogpostRoute');
const commentRouter = require('./Controllers/commentRoute');
const githubOauthRouter = require('./Routes/githubOauth');
const googleOauthRouter = require('./Routes/googleOauth');
const resetPasswordRouter = require('./Routes/resetPassword');
const forgotPasswordRouter = require('./Routes/forgotPassword');
const authRouter = require('./Routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;
const FrontendURL = process.env.FRONTEND_URL;
const secretKey = process.env.SECRET_KEY;
const mongoURI = process.env.MONGODB_URI;
const MongoDBStore = connectMongoDBSession(session);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
const corsOptions = {
    origin: FrontendURL,
    credentials: true,
};
app.use(cors(corsOptions));
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
        sameSite: "none", // use "none" in production
        httpOnly: true,
        secure: true, // use with https in production
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
app.use('/delete-user', deleteUserRouter);
app.use('/blogpost', blogpostRouter);
app.use('/comment', commentRouter);
app.use('/auth/github', githubOauthRouter);
app.use('/auth/google', googleOauthRouter);
app.use('/reset-password', resetPasswordRouter);
app.use('/forgot-password', forgotPasswordRouter);
app.use('/check-auth', authRouter);
app.use('/api', searchBlogPostRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
  });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
})

// Close the database connection when the Node process ends
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing HTTP server.');
    server.close(() => {
        console.log('HTTP server closed.');
        closeDBConnection();
        process.exit(0);
    });
});