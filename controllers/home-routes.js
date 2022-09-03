const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


 
 router.get('/login', (req, res) => {
    res.render('login');
  });

  module.exports = router;