const express = require('express');
const async = require('async');
const moment = require('moment');

const router = express.Router();

const Category = require('../models/category');
const Habit = require('../models/habit');
const HabitEntry = require('../models/habitEntry');
const { UserCheck } = require('../utils/authChecking');


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
      const scores = [];
      // Pull all categories by userId
      Category.find({ userId }, (err, categories) => {
        if (err) {
          res.send({
            success: false,
            error: 'Error pulling score.',
          });
          return;
        }
        // Loop through each category and pull all habits from each
        async.each(categories, (category, cb) => {
          const catObj = {
            name: category.name,
            categoryId: category._id,
            color: category.color,
            habits: [],
          };
          // Loop through each category and pull all habits from each
          Habit.find({ userId, categoryId: category._id }, (err2, habits) => {
            if (err2) {
              res.send({
                success: false,
                error: 'Error pulling score.',
              });
              return;
            }
            async.each(habits, (habit, cb2) => {
              const habitObj = {
                name: habit.name,
                habitId: habit._id,
                score: 0,
              };
              // Manipulate dates
              const today = new Date();
              let days = 0;
              if (period === 'week') {
                days = 7;
              } else if (period === 'month') {
                days = 30;
              }
              const startDate = moment(today).subtract(days, 'days').startOf('day').format('');
              const endDate = moment(today).endOf('day').format('');
              // For each habit, pull out habitEntry by date and id
              HabitEntry.find({ habitId: habit._id, date: { $gte: startDate, $lt: endDate } }, (err3, entries) => {
                if (err3) {
                  res.send({
                    success: false,
                    error: 'Error pulling score.',
                  });
                  return;
                }
                entries.forEach((entry) => {
                  if (entry.didComplete) {
                    habitObj.score += 1;
                  }
                });
                catObj.habits.push(habitObj);
                cb2();
              });
            }, (err4) => {
              if (err4) {
                res.send({
                  success: false,
                  error: 'Error pulling habits.',
                });
                return;
              }
              scores.push(catObj);
              cb();
            });
          });
        }, (err5) => {
          if (err5) {
            res.send({
              success: false,
              error: 'Error pulling habits.',
            });
            return;
          }
          res.send({
            success: true,
            error: '',
            scores,
          });
        });
      });
    });
  });


  return router;
};
