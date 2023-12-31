const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getUserByGitHubId, getUserByGoogleId, saveUser } = require('../DB/user');
require('dotenv').config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const BACKEND_URL = process.env.BACKEND_URL;

// Github Strategy for Passport Authentication
passport.use(
    new GithubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: `${BACKEND_URL}/auth/github/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const githubId = profile.id;
                // Try to find the user by GitHub user ID
                let user = await getUserByGitHubId(githubId);
                if (!user) {
                    // If the user doesn't exist, create a new user with GitHub user ID
                    user = {
                        githubId: githubId,
                    };
                    await saveUser(user);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);
 
// Google Strategy for Passport Authentication
passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: `${BACKEND_URL}/auth/google/callback`,
        },
        async (token, tokenSecret, profile, done) => {
            try {
                const googleId = profile.id;
                // Try to find the user by Google user ID
                let user = await getUserByGoogleId(googleId);
                if (!user) {
                    // If the user doesn't exist, create a new user with the Google user ID
                    user = {
                        googleId: googleId,
                        // Add other relevant user data
                    };
                    await saveUser(user);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user);
   });

passport.deserializeUser(function(user, done) {
    done(null, user);
   });

module.exports = passport;