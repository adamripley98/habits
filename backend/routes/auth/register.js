const express = require('express');

const router = express.Router();

const User = require('../../models/user');

module.exports = () => {
  // Route to handle user registration
  router.post('/register', (req, res) => {
    const { name, email, encryptedPassword } = req.body;

    if (!name || !email || !encryptedPassword) {
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
        password: encryptedPassword,
      });

      newUser.save()
        .then(() => {
          // TODO send welcome email
          // TODO log user in
          res.send({
            success: true,
            error: null,
          });
        })
        .catch(() => {
          res.send({
            success: false,
            error: 'Error registering user.',
          });
        });
    });
    // TODO Check for valid name and email and password
    // TODO Check to make sure user doesn't already exist
    res.send({ success: true });
  });

  return router;
};
