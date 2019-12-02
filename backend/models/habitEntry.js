const mongoose = require('mongoose');

const { Schema } = mongoose;

const habitEntrySchema = new Schema({
  habitId: String,
  userId: String,
  date: String,
  didComplete: Boolean,
});

module.exports = mongoose.model('HabitEntry', habitEntrySchema);
