const mongoose = require('mongoose');

const { Schema } = mongoose;

const habitSchema = new Schema({
  name: String,
  userId: String,
  categoryId: String,
  startDate: Date,
});

module.exports = mongoose.model('Habit', habitSchema);
