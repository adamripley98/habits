const mongoose = require('mongoose');

const { Schema } = mongoose;

const relationshipSchema = new Schema({
  user1Id: String,
  user2Id: String,
  status: String,
});

module.exports = mongoose.model('Relationship', relationshipSchema);
