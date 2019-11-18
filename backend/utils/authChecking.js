// Helper method to check if a user is logged in
const UserCheck = (req, cb) => {
  // Isolate userId from backend
  let userId = '';
  if (req.session.passport) {
    userId = req.session.passport.user;
  }
  // User is not logged in
  if (!userId) {
    cb({
      success: false,
      error: 'Must be logged in.',
    });
    return;
  }
  // User is logged in
  cb({
    success: true,
    error: '',
  });
};

module.exports = {
  UserCheck,
};
