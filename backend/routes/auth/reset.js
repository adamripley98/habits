const express = require('express');

const router = express.Router();

const User = require('../../models/user');

const { encryptPassword } = require('../../utils/passwordUtils');


module.exports = () => {
  // Route to handle user registration
  router.get('/reset/:token', (req, res) => {
    // Isolate parameters
    const { token } = req.params;
    // Find given user with refresh token in Mongo, makes sure it isn't expired
    User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
      if (err) {
        res.send({
          success: false,
          error: err.message,
        });
        return;
        // Token is not valid
      }
      if (!user) {
        res.send({
          success: false,
          error: 'Password reset token is invalid or has expired.',
        });
        return;
      }
      // No errors
      res.send({
        success: true,
        error: '',
      });
    });
  });

  // Route to handle resetting a password
  router.post('/reset', (req, res) => {
    // Isolate variables
    const { password, token } = req.body;
    console.log(req.body);
    // Find given user with refresh token in Mongo, makes sure it isn't expired
    User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
      if (err) {
        res.send({
          success: false,
          error: err.message,
        });
        return;
        // Token is not valid
      }
      if (!user) {
        res.send({
          success: false,
          error: 'Password reset token is invalid or has expired.',
        });
        return;
      }
      // Update password, clear reset password fields
      user.password = encryptPassword(password);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      // Save user changes in mongo
      user.save((errUser) => {
        // Error saving changes
        if (errUser) {
          res.send({
            succcess: false,
            error: errUser,
          });
          return;
        }
        // Successful password change
        res.send({
          success: true,
          error: '',
        });
      });
    });
  });

  return router;
};
