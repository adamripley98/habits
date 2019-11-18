const express = require('express');

const router = express.Router();

const Category = require('../models/category');
const User = require('../models/user');
const UserCheck = require('../utils/authChecking');

module.exports = () => {
  /*
  Route to handle posting a new category
  */
  router.post('/add', (req, res) => {
    // Check to see if user is logged in
    UserCheck(req, (authRes) => {
      if (!authRes.success) {
        res.send({
          success: false,
          error: authRes.error,
        });
        return;
      }
      // Ensure parameters are provided
      const { name, color } = req.body;
      if (!name || !color) {
        res.send({
          success: false,
          error: 'Provide a name and a color.',
        });
        return;
      }
      const userId = req.session.passport.user;
      // Search by userId and categoryName to ensure category doesn't already exist
      Category.findOne({ userId, name }, (err, category) => {
        if (err) {
          res.send({
            success: false,
            error: 'Error adding category.',
          });
          return;
        }
        // Category already exists
        if (category) {
          res.send({
            success: false,
            error: `Category with name ${name} already exists.`,
          });
          return;
        }
        // If it doesn't exist, create a new category with name, color, and userId
        const newCategory = new Category({
          name,
          color,
          userId,
        });
        // Save category in DB
        newCategory.save()
          .then(() => {
            res.send({
              success: true,
              error: false,
            });
          })
          .catch(() => {
            res.send({
              success: false,
              error: 'Error adding category.',
            });
          });
      });
    });
  });

  return router;
};
