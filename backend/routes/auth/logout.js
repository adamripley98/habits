const express = require('express');

const router = express.Router();

module.exports = () => {
  router.post('/logout', (req, res) => {
    req.logout();

    // Destroying session
    req.session.destroy((err) => {
      // Error logging out
      if (err) {
        res.send({
          success: false,
          error: err,
        });
      } else {
        // If the logout was successful
        res.send({
          success: true,
          error: null,
        });
      }
    });
  });

  return router;
};
