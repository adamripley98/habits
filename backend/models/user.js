const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  accountVerified: Boolean,
  verificationToken: String,
});

module.exports = mongoose.model('User', userSchema);
