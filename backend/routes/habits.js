const express = require('express');
const async = require('async');
const moment = require('moment');

const router = express.Router();

const Category = require('../models/category');
const Habit = require('../models/habit');
const HabitEntry = require('../models/habitEntry');
const { UserCheck } = require('../utils/authChecking');
const { getHabits } = require('../utils/getHabits');

module.exports = () => {
  /*
  Route to handle posting a new habit category
  */
  router.post('/categories/add', (req, res) => {
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
            return;
          }
          res.send({
            success: true,
            error: false,
            habits,
          });
        });
      });
    });
  });

  /*
  Route to pull a user's habit data for a specific date
  */
  /*
  Route to pull all of a user's habits
  */
  router.get('/habits/:date', (req, res) => {
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
      const { date } = req.params;
      // Helper method that returns habits in proper form for a given user on a date
      getHabits(userId, date, (resp) => {
        if (!resp.success) {
          res.send({
            success: false,
            error: authRes.error,
          });
          return;
        }
        res.send({
          success: true,
          error: false,
          habits: resp.habits,
        });
      });
    });
  });

  /*
  Route to add a new habit
  */
  router.post('/habits/add', (req, res) => {
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
      const { habitName, categoryName } = req.body;
      if (!habitName || !categoryName) {
        res.send({
          success: false,
          error: 'Provide a name and a category.',
        });
        return;
      }
      const userId = req.session.passport.user;
      // Search database for existing habits with same name
      Habit.findOne({ name: habitName, userId }, (err, habit) => {
        if (err) {
          res.send({
            success: false,
            error: 'Error adding habit.',
          });
          return;
        }
        if (habit) {
          res.send({
            success: false,
            error: `There is already a habit named ${habitName} .`,
          });
          return;
        }
        // Pull out category ID
        Category.findOne({ name: categoryName, userId }, (err2, category) => {
          if (err2 || !category) {
            res.send({
              success: false,
              error: 'Error creating habit.',
            });
            return;
          }
          // Create new habit
          const newHabit = new Habit({
            name: habitName,
            userId,
            categoryId: category._id,
            startDate: new Date(),
          });
          // Save habit in DB
          newHabit.save()
            .then(() => {
              res.send({
                success: true,
                error: false,
                newHabit: { name: habitName, category: categoryName },
              });
            })
            .catch(() => {
              res.send({
                success: false,
                error: 'Error adding habit.',
              });
            });
        });
      });
    });
  });

  /*
  Route to check or uncheck a habit
  */
  router.post('/habits/check', (req, res) => {
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
      const { habitId, date, didComplete } = req.body;
      if (!habitId || !date) {
        res.send({
          success: false,
          error: 'Provide a habit and a date.',
        });
        return;
      }
      const userId = req.session.passport.user;
      // Manipulate dates
      const beginningOfDay = moment(date).startOf('day').format('');
      const endOfDay = moment(date).endOf('day').format('');
      // Search for habit entry by id and date
      HabitEntry.findOne({ userId, habitId, date: { $gte: beginningOfDay, $lt: endOfDay } }, (err, habitEntry) => {
        if (err) {
          res.send({
            success: false,
            error: 'Error completing habit.',
          });
          return;
        }
        console.log('what is habitEntry', habitEntry);
        // If user hasn't made an entry, create a new one
        if (!habitEntry) {
          const newHabitEntry = new HabitEntry({
            userId,
            habitId,
            didComplete,
            date,
          });
          console.log(newHabitEntry, 'newHabitEntry');
          // Save habit entry in DB
          newHabitEntry.save()
            .then(() => {
              console.log('should be saving', habitEntry);
              // Helper method that returns habits in proper form for a given user on a date
              getHabits(userId, date, (resp) => {
                if (!resp.success) {
                  res.send({
                    success: false,
                    error: authRes.error,
                  });
                  return;
                }
                res.send({
                  success: true,
                  error: false,
                  habits: resp.habits,
                });
              });
            })
            .catch(() => {
              res.send({
                success: false,
                error: 'Error completing habit.',
              });
            });
        } else {
          // User already has made the entry, they are updating their answer
          habitEntry.didComplete = didComplete;
          habitEntry.save()
            .then(() => {
              console.log('should be saving', habitEntry);
              // Helper method that returns habits in proper form for a given user on a date
              getHabits(userId, date, (resp) => {
                if (!resp.success) {
                  res.send({
                    success: false,
                    error: authRes.error,
                  });
                  return;
                }
                res.send({
                  success: true,
                  error: false,
                  habits: resp.habits,
                });
              });
            })
            .catch(() => {
              res.send({
                success: false,
                error: 'Error completing habit.',
              });
            });
        }
      });
    });
  });

  return router;
};
