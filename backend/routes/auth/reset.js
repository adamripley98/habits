const express = require('express');

const router = express.Router();

const User = require('../../models/user');

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

  return router;
};
