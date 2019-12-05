const express = require('express');
const async = require('async');

const router = express.Router();

const Relationship = require('../models/relationship');
const User = require('../models/user');
const { UserCheck } = require('../utils/authChecking');
const { getScore } = require('../utils/getScore');


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
        // TODO make this work
        if (user._id === userId) {
          res.send({
            success: false,
            error: 'You cannot add yourself as a friend.',
          });
          return;
        }
        // Search for an existing relationship
        Relationship.find({ $and: [{ $or: [{ user1Id: new RegExp(user._id, 'i') }, { user2Id: new RegExp(user._id, 'i') }] }, { $or: [{ user1Id: new RegExp(userId, 'i') }, { user2Id: new RegExp(userId, 'i') }] }] }, (err2, relationship) => {
          if (err2) {
            res.send({
              success: false,
              error: 'Error adding friend.',
            });
            return;
          }
          // Relationship already exists
          if (relationship.length) {
            console.log('yee', relationship);
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
              res.send({
                success: false,
                error: 'Error adding friend.',
              });
            });
        });
      });
    });
  });

  /*
  Route to handle receiving all relationships
  */
  router.get('/relationships', (req, res) => {
    // Check to see if user is logged in
    UserCheck(req, (authRes) => {
      if (!authRes.success) {
        res.send({
          success: false,
          error: authRes.error,
        });
        return;
      }
      const userId = req.session.passport.user;

      // Search through relationships
      Relationship.find({ $or: [{ user1Id: new RegExp(userId, 'i') }, { user2Id: new RegExp(userId, 'i') }] }, (err, relationships) => {
        if (err) {
          res.send({
            success: false,
            error: 'Error getting friends.',
          });
          return;
        }
        const r = [];
        // Relationship already exists
        if (relationships.length) {
          async.each(relationships, (relationship, cb) => {
            let otherUserId = '';
            let status = '';
            if (relationship.status === 'friends') {
              status = 'friends';
              otherUserId = userId === relationship.user1Id ? relationship.user2Id : relationship.user1Id;
            } else if (userId === relationship.user1Id) {
              otherUserId = relationship.user2Id;
              status = 'pending';
            } else {
              otherUserId = relationship.user1Id;
              status = 'requested';
            }
            User.findById(otherUserId, (err2, user) => {
              if (err2) {
                res.send({
                  success: false,
                  error: 'Error adding user.',
                });
                return;
              }
              r.push({
                name: user.name,
                profilePicture: user.profilePicture,
                userId: otherUserId,
                status,
              });
              cb();
            });
          }, (err3) => {
            if (err3) {
              res.send({
                success: false,
                error: 'Error getting friends.',
              });
              return;
            }
            res.send({
              success: true,
              error: '',
              relationships: r,
            });
          });
        } else {
          res.send({
            success: true,
            relationships: [],
          });
        }
      });
    });
  });

  /*
  Route to handle getting all friend's content
  */
  router.get('/relationships/content', (req, res) => {
    // Check to see if user is logged in
    UserCheck(req, (authRes) => {
      if (!authRes.success) {
        res.send({
          success: false,
          error: authRes.error,
        });
        return;
      }
      const userId = req.session.passport.user;
      // Search through relationships
      Relationship.find({ $or: [{ user1Id: new RegExp(userId, 'i') }, { user2Id: new RegExp(userId, 'i') }] }, (err, relationships) => {
        if (err) {
          res.send({
            success: false,
            error: 'Error getting content.',
          });
          return;
        }
        console.log('1');
        const content = [];
        // Relationship already exists
        if (relationships.length) {
          async.each(relationships, (relationship, cb) => {
            console.log('2');
            let otherUserId = '';
            // Only show content if they're friends, not pending
            if (relationship.status === 'friends') {
              otherUserId = userId === relationship.user1Id ? relationship.user2Id : relationship.user1Id;
              getScore(otherUserId, 'week', (resp) => {
                console.log('3');
                if (!resp.success) {
                  res.send({
                    success: false,
                    error: 'Error pulling content.',
                  });
                  return;
                }
                User.findById(otherUserId, (err2, user) => {
                  if (err2) {
                    res.send({
                      success: false,
                      error: 'Error pulling content.',
                    });
                    return;
                  }
                  console.log('4');
                  content.push({
                    name: user.name,
                    profilePicture: user.profilePicture,
                    userId: otherUserId,
                    scores: resp.scores,
                  });
                  cb();
                });
              });
            } else {
              cb();
            }
          }, (err3) => {
            if (err3) {
              res.send({
                success: false,
                error: 'Error getting friends.',
              });
              return;
            }
            console.log('5');
            res.send({
              success: true,
              error: '',
              content,
            });
          });
        } else {
          res.send({
            success: true,
            content: [],
          });
        }
      });
    });
  });

  /*
  Route to handle rejecting a friend
  */
  router.post('/relationships/reject', (req, res) => {
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
      const otherUserId = req.body.userId;
      if (!otherUserId) {
        res.send({
          success: false,
          error: 'Could not reject friend.',
        });
        return;
      }
      Relationship.findOneAndRemove({ $and: [{ $or: [{ user1Id: new RegExp(userId, 'i') }, { user2Id: new RegExp(userId, 'i') }] }, { $or: [{ user1Id: new RegExp(otherUserId, 'i') }, { user2Id: new RegExp(otherUserId, 'i') }] }] }, (err, relationship) => {
        if (err) {
          res.send({
            success: false,
            error: 'Could not reject friend',
          });
          return;
        }
        res.send({
          success: true,
          error: '',
        });
      });
    });
  });

  /*
  Route to handle accepting a friend
  */
  router.post('/relationships/accept', (req, res) => {
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
      const otherUserId = req.body.userId;
      if (!otherUserId) {
        res.send({
          success: false,
          error: 'Could not accept friend.',
        });
        return;
      }
      Relationship.findOne({ $and: [{ $or: [{ user1Id: new RegExp(userId, 'i') }, { user2Id: new RegExp(userId, 'i') }] }, { $or: [{ user1Id: new RegExp(otherUserId, 'i') }, { user2Id: new RegExp(otherUserId, 'i') }] }] }, (err, relationship) => {
        if (err) {
          res.send({
            success: false,
            error: 'Could not accept friend',
          });
          return;
        }
        relationship.status = 'friends';
        relationship.save()
          .then(() => {
            res.send({
              success: true,
              error: '',
            });
          })
          .catch(() => {
            res.send({
              success: false,
              error: 'Could not accept friend',
            });
          });
      });
    });
  });


  return router;
};
