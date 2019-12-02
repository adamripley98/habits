const async = require('async');
const moment = require('moment');

const Category = require('../models/category');
const Habit = require('../models/habit');
const HabitEntry = require('../models/habitEntry');

const getHabits = (userId, date, callback) => {
  const habits = [];
  // Pull all categories by userId
  Category.find({ userId }, (err, categories) => {
    // Loop through each category and pull all habits from each
    async.each(categories, (category, cb) => {
      const catObj = {
        name: category.name,
        categoryId: category._id,
        color: category.color,
        habits: [],
      };
      // Loop through each category and pull all habits from each
      Habit.find({ userId, categoryId: category._id }, (err2, habs) => {
        async.each(habs, (hab, cb2) => {
          // Manipulate dates
          const beginningOfDay = moment(date).startOf('day').format('');
          const endOfDay = moment(date).endOf('day').format('');
          // For each habit, pull out habitEntry by date and id
          HabitEntry.findOne({ habitId: hab._id, date: { $gte: beginningOfDay, $lt: endOfDay } }, (err3, h) => {
            if (err3) {
              callback({
                success: false,
                error: 'Error pulling habits.',
              });
              return;
            }
            const habitObj = {
              name: hab.name,
              habitId: hab._id,
              // If entry hasn't been made, default to false
              didComplete: h ? h.didComplete : false,
            };
            // Add to object
            catObj.habits.push(habitObj);
            cb2();
          });
        }, (err4) => {
          if (err4) {
            callback({
              success: false,
              error: 'Error pulling habits.',
            });
            return;
          }
          habits.push(catObj);
          cb();
        });
      });
    }, (err5) => {
      if (err5) {
        callback({
          success: false,
          error: 'Error pulling habits.',
        });
        return;
      }
      callback({
        success: true,
        error: '',
        habits,
      });
    });
  });
};

module.exports = {
  getHabits,
};
