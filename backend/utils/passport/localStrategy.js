const LocalStrategy = require('passport-local');

const User = require('../../models/user');
const { checkHashedPassword } = require('../passwordUtils');

module.exports = (passport) => {
  passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    // Find the user with the given username
    User.findOne({ email: username }, (err, user) => {
      console.log('looking for user', username, password);
      // If there's an error, finish trying to authenticate (auth failed)
      if (err) {
        return done(err);
      }

      // If no user is present, authentication failed
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      // If passwords do not match, auth failed
      if (!checkHashedPassword(user, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Authentication is successful
      return done(null, user);
    });
  }));
};
