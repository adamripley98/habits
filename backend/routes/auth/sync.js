const express = require('express');

const router = express.Router();

// 1. both logged in : sync success
// 2. both logged out: sync success
// 3. frontend in, backend out: sync error
// 4. backend in, frontend out: sync error
module.exports = () => {
  // Route to check if backend auth state and frontend state sync
  router.get('/sync/:userId', (req, res) => {
    let frontendId = null;
    let backendId = null;
    if (req.params) {
      frontendId = req.params.userId;
    }
    if (req.session.passport) {
      backendId = req.session.passport.user;
    }
    // If both states are logged in or both states are not logged in
    if ((frontendId && backendId) || (!frontendId && !backendId)) {
      res.send({
        success: true,
      });
      return;
    }
    // Otherwise send back error
    res.send({
      success: false,
      error: 'States are not synced.',
    });
  });

  return router;
};
