const express = require('express');

const router = express.Router();

const { UserCheck } = require('../utils/authChecking');
const { getScore } = require('../utils/getScore');


module.exports = () => {
  /*
  Route to handle getting a user's score in a given period
  */
  router.get('/score/:period', (req, res) => {
    // Check to see if user is logged in
    UserCheck(req, (authRes) => {
      if (!authRes.success) {
        res.send({
          success: false,
          error: authRes.error,
        });
        return;
      }
      // Isolate parameters
      const userId = req.session.passport.user;
      const { period } = req.params;
      if (!period) {
        res.send({
          success: false,
          error: 'Provide a time period.',
        });
        return;
      }
      getScore(userId, period, (resp) => {
        if (!resp.success) {
          res.send({
            success: false,
            error: resp.error,
          });
          return;
        }
        res.send({
          success: true,
          scores: resp.scores,
        });
      });
    });
  });


  return router;
};
