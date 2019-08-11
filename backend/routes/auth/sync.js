const express = require('express');

const router = express.Router();

const User = require('../../models/user');
const { encryptPassword } = require('../../utils/passwordUtils');

module.exports = () => {
  // Route to check if backend auth state and frontend state sync
  router.get('/sync', (req, res) => {
    console.log('session', req.session);
    res.send({
      success: false,
      error: 'Not implemented'
    })
  });

  return router;
};
