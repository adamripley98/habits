const express = require('express');

const router = express.Router();

const User = require('../../models/user');
const { encryptPassword } = require('../../utils/passwordUtils');
const { sendWelcomeEmail } = require('../../utils/sendEmail');

module.exports = () => {
  // Route to handle user registration
  router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.send({
        success: false,
        error: 'Ensure all fields are filled in.',
      });
      return;
    }

    User.findOne({ email }, (err, user) => {
      if (err) {
        res.send({
          success: false,
          error: 'Error registering user.',
        });
        return;
      }
      if (user) {
        res.send({
          success: false,
          error: `User with email ${email} already exists.`,
        });
        return;
      }
      const newUser = new User({
        email,
        name,
        password: encryptPassword(password),
        accountVerified: false,
      });

      // Send welcome email to new user
      sendWelcomeEmail(newUser, (resp) => {
        if (!resp.success) {
          res.send({
            success: false,
            error: resp.error,
          });
          return;
        }
        // No error, save user
        newUser.verificationToken = resp.token;
        newUser.save()
          .then((usr) => {
            req.login(usr, (errLogin) => {
              if (errLogin) {
                res.send({
                  success: false,
                  error: `Error logging in new user: ${errLogin}`,
                });
              } else {
                // Send back user
                res.send({
                  success: true,
                  error: null,
                  user: {
                    email,
                    name,
                    userId: usr._id,
                  },
                });
              }
            });
          })
          .catch(() => {
            res.send({
              success: false,
              error: 'Error registering user.',
            });
          });
      });
    });
  });

  return router;
};
