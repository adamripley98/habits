const express = require('express');

const router = express.Router();

module.exports = (passport) => {
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (passportErr, user) => {
      if (passportErr) {
        res.status(404).send({ error: passportErr });
        return;
      }

      if (!user) {
        res.status(404).send({ error: 'Invalid email or password.' });
        return;
      }
      // Built in passport login method
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          res.status(404).send({ error: loginErr });
          return;
        }

        res.send({ user });
      });
    })(req, res, next);
  });

  return router;
};
