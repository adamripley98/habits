const bcrypt = require('bcrypt-nodejs');

// Helper function to encrypt password
function encryptPassword(password) {
  const hash = bcrypt.hashSync(password);
  return hash;
}

// Helper function to check hashed password during log in
function checkHashedPassword(password, hashedPassword) {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    if (err) return false;
    return res;
  });
}

module.exports = {
  encryptPassword,
  checkHashedPassword,
};
