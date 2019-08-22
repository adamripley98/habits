const express = require('express');

const router = express.Router();

const User = require('../../models/user');

module.exports = () => {
  // Route to verify a user
  router.get('/verify/:token', (req, res) => {
    const { token } = req.params;
    const userId = req.session.passport.user;
    if (!token) {
      res.send({
        success: false,
        error: 'Token link is broken.',
      });
      return;
    }

    if (!userId) {
      res.send({
        success: false,
        error: 'User not logged in.',
      });
      return;
    }

    User.findById(userId, (err, user) => {
      if (err) {
        res.send({
          success: false,
          error: 'Error verifying user.',
        });
        return;
      }

      if (user.accountVerified) {
        res.send({
          success: false,
          error: 'User is already verified.',
        });
        return;
      }

      if (user.verificationToken !== token) {
        res.send({
          success: false,
          error: 'Error verifying user.',
        });
        return;
      }

      user.verificationToken = null;
      user.accountVerified = true;

      user.save((errSave) => {
        if (errSave) {
          res.send({
            success: false,
            error: 'Error verifying user.',
          });
          return;
        }
        res.send({
          success: true,
        });
      });
    });
  });
  return router;
};
