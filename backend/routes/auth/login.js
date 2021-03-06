const express = require('express');

const router = express.Router();

module.exports = (passport) => {
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (passportErr, user) => {
      if (passportErr) {
        res.send({ error: passportErr });
        return;
      }

      if (!user) {
        res.send({ error: 'Invalid email or password.' });
        return;
      }
      // Built in passport login method
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          res.send({ error: loginErr });
          return;
        }
        const userData = {
          email: user.email,
          name: user.name,
          userId: user._id,
        };
        res.send({
          success: true,
          error: null,
          user: userData
        });
      });
    })(req, res, next);
  });

  return router;
};
