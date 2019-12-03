const mongoose = require('mongoose');

const { Schema } = mongoose;

const relationshipSchema = new Schema({
  habitId: String,
  userId: String,
  date: String,
  didComplete: Boolean,
});

module.exports = mongoose.model('Relationship', relationshipSchema);
