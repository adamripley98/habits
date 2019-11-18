const mongoose = require('mongoose');

const { Schema } = mongoose;

const habitEntrySchema = new Schema({
  habitId: String,
  userId: String,
  date: Date,
  didComplete: Boolean,
});

module.exports = mongoose.model('HabitEntry', habitEntrySchema);
