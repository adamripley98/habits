const express = require('express');

const router = express.Router();

const Category = require('../models/category');
const User = require('../models/user');
const UserCheck = require('../utils/authChecking');

module.exports = () => {
  /*
  Route to handle posting a new category
  */
  router.post('/add', (req, res) => {
    // Check if user is logged in
    UserCheck(req, (authRes) => {
      if (!authRes.success) {
        res.send({
          success: false,
          error: authRes.error,
        });
        return;
      }

      const { name, color } = req.body;
      if (!name || !color) {
        res.send({
          success: false,
          error: 'Provide a name and a color.',
        });
        return;
      }

      User.findById(req.session.passport.user, (err, user) => {
        if (err || !user) {
          res.send({
            success: false,
            error: 'Error adding category.',
          });
          return;
        }
        let categoryAlreadyExists = false;
        // TODO need to make this async
        user.categories.forEach(category => {
          if (category)
        })
      });

      Category.findOne({ name }, (err, category) => {
        if (err) {
          res.send({
            success: false,
            error: 'Error adding category.',
          });
          return;
        }
        // Category already exists
        if (category) {
          res.send({
            success: false,
            error: `A category with the name ${name} already exists.`,
          });
          return;
        }
        const newCategory = new Category({
          name,
          color,
        });
      });
    });
  });

  return router;
};
