const express = require('express');
const async = require('async');

const router = express.Router();

const Category = require('../models/category');
const Habit = require('../models/habit');
const { UserCheck } = require('../utils/authChecking');

module.exports = () => {
  /*
  Route to handle posting a new habit category
  */
  router.post('/category/add', (req, res) => {
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
              newCategory: name,
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

  /*
  Route to handle editing a habit category (i.e. changing color or name)
  */
  router.post('/edit', (req, res) => {
    // Check to make sure user is logged in
    UserCheck(req, (authRes) => {
      if (!authRes.success) {
        res.send({
          success: false,
          error: authRes.error,
        });
        return;
      }
      // Check to make sure params are provided (color, name)
      const { color, name } = req.body;
      if (!name || !color) {
        res.send({
          success: false,
          error: 'Provide a name and a color.',
        });
        return;
      }
      const userId = req.session.passport.user;
      // Search by userId and category name
      Category.findOne({ userId, name }, (err, category) => {
        // If it doesn't exist, throw error
        if (err || !category) {
          res.send({
            success: false,
            error: 'Error updating category.',
          });
          return;
        }
        // If it does exist, make changes to category and return
        category.name = name;
        category.color = color;
        category.save()
          .then(() => {
            res.send({
              success: true,
              error: false,
            });
          })
          .catch(() => {
            res.send({
              success: false,
              error: 'Error updating category.',
            });
          });
      });
    });
  });

  /*
  Route to handle deleting a habit category
  NOTE: deleting habit category deletes its children habits as well
  */
  router.delete('/', (req, res) => {
    // Check to make sure user is logged in
    UserCheck(req, (authRes) => {
      if (!authRes.success) {
        res.send({
          success: false,
          error: authRes.error,
        });
        return;
      }
      // Check to make sure params are provided (color, name)
      const { name } = req.body;
      if (!name) {
        res.send({
          success: false,
          error: 'Provide a name and a color.',
        });
        return;
      }
      const userId = req.session.passport.user;
      // Search by userId and category name, delete category
      Category.findOneAndRemove({ userId, name }, (err, category) => {
        if (err || !category) {
          res.send({
            success: false,
            error: 'Error deleting category.',
          });
          return;
        }
        // Search habits by categoryId and delete any belonging to that category
        Habit.deleteMany({ userId, categoryId: category._id }, (error) => {
          if (error) {
            res.send({
              success: false,
              error: 'Error deleting category.',
            });
            return;
          }
          res.send({
            success: true,
            error: false,
          });
        });
      });
    });
  });

  /*
  Route to pull all of a user's habits
  */
  router.get('/habits', (req, res) => {
    // Check to ensure user is logged in
    UserCheck(req, (authRes) => {
      if (!authRes.success) {
        res.send({
          success: false,
          error: authRes.error,
        });
        return;
      }
      const userId = req.session.passport.user;
      const habits = {};
      // Pull all categories by userId
      Category.find({ userId }, (err, categories) => {
        // Loop through each category and pull all habits from each
        async.each(categories, (category, cb) => {
          Habit.find({ userId, categoryId: category._id }, (err2, habs) => {
            habits[category.name] = habs;
            cb();
          });
        }, (err3) => {
          if (err3) {
            res.send({
              success: false,
              error: 'Error pulling habits.',
            });
          } else {
            res.send({
              success: true,
              error: false,
              habits,
            });
          }
        });
      });
    });
  });

  return router;
};
