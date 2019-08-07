const express = require('express');

const router = express.Router();

// const User = require('../../models/user');
// const checkHashedPassword = require('../../utils/passwordUtils');

module.exports = () => {
  // Route to handle user registration
  router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.send({
        success: false,
        error: 'Ensure all fields are filled in.',
      });
      return;
    }
    console.log('ok');
    res.send({
      success: false,
      error: 'Not yet implemented.',
    });
  });

  return router;
};
