const express = require('express');
const async = require('async');
const moment = require('moment');

const router = express.Router();

const Relationship = require('../models/relationship');
const User = require('../models/user');
const { UserCheck } = require('../utils/authChecking');


module.exports = () => {
  /*
  Route to handle adding a friend
  */
  router.post('/relationships/add', (req, res) => {
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
      const { friendEmail } = req.body;
      if (!friendEmail) {
        res.send({
          success: false,
          error: 'Provide a valid email.',
        });
        return;
      }
      // Find the user by their email
      User.findOne({ email: friendEmail }, (err, user) => {
        if (err) {
          console.log('err1', err);
          res.send({
            success: false,
            error: 'Error adding friend.',
          });
          return;
        }
        if (!user) {
          res.send({
            success: false,
            error: 'There is no one registered with this email.',
          });
          return;
        }
        // Cannot add self
        if (user._id === userId) {
          res.send({
            success: false,
            error: 'You cannot add yourself as a friend.',
          });
          return;
        }
        // Search for an existing relationship
        Relationship.find({ $or: [{ user1Id: new RegExp(user._id, 'i') }, { user2Id: new RegExp(user._id, 'i') }] }, (err2, relationship) => {
          if (err2) {
            console.log(err2, 'err2');
            res.send({
              success: false,
              error: 'Error adding friend.',
            });
            return;
          }
          // Relationship already exists
          if (relationship.length) {
            console.log('err3', relationship);
            res.send({
              success: false,
              error: 'Relationship already exists.',
            });
            return;
          }
          // If relationship doesn't exist, create one
          // NOTE: Very important that one who is doing the action is user1!!!
          const newRelationship = new Relationship({
            user1Id: userId,
            user2Id: user._id,
            status: 'pending',
          });
          newRelationship.save()
            .then(() => {
              res.send({
                success: true,
                error: '',
              });
            })
            .catch(() => {
              console.log('err4');
              res.send({
                success: false,
                error: 'Error adding friend.',
              });
            });
        });
      });
    });
  });


  return router;
};
