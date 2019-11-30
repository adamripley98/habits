const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  color: String,
  userId: String,
});

module.exports = mongoose.model('Category', categorySchema);
