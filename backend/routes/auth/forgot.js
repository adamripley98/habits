const express = require('express');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

const router = express.Router();

const User = require('../../models/user');

module.exports = () => {
  // Route to handle user registration
  router.post('/forgot', (req, res) => {
    const { email } = req.body;
    crypto.randomBytes(20, (er, buf) => {
      if (er) {
        res.send({
          success: false,
          error: er,
        });
        return;
      }

      const token = buf.toString('hex');

      User.findOne({ email }, (err, user) => {
        if (err || !user) {
          res.send({
            success: false,
            error: 'Account could not be found.',
          });
          return;
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save()
          .then(() => {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            const msg = {
              to: email,
              from: process.env.SENDGRID_EMAIL,
              subject: 'Habit App Password Reset',
              text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                  'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                  'If you did not request this, please ignore this email and your password will remain unchanged.\n',
            };

            sgMail.send(msg, (error) => {
              if (error) {
                res.send({
                  success: false,
                  error,
                });
                return;
              }
              res.send({
                success: true,
                error: '',
              });
            });
          })
          .catch(() => {
            res.send({
              success: false,
              error: 'Error sending email',
            });
          });
      });
    });
  });

  return router;
};
