const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { getUserByEmail, getUserById, saveUser } = require('../DB/user');

// Function to generate a password hash
async function generateHash(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Local authentication strategy for signup (email/password)
passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true, // Pass the req object to the callback below
    },
    async (req, email, password, done) => {
      try {
        const hashedPassword = await generateHash(password);
        const newUser = {
          email: email,
          password: hashedPassword,
        };
        // Save the new user to your database
        const savedUser = await saveUser(newUser);
        return done(null, savedUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Local authentication strategy for login (email/password)
passport.use(
    'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
  async (req, email, password, done) => {
    try {
        // Check if the email exists in your database
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false);
      }
        // Check if the password is correct
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialization function to store user data in sessions
passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
// Deserialization function to retrieve user data from sessions
 passport.deserializeUser(async (id, done) => {
    try {
     const user = await getUserById(id);
        done(null, user);
    } catch (err) {
     done(err);
    }
     });

module.exports = passport;
