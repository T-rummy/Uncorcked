const router = require('express').Router();
const sequelize = require('../config/connection');
const { Wine, User, Vote, Comment } = require('../models');

// Get all Wines render homepage
router.get('/', (req, res) => {
  Wine.findAll({
    attributes: [
      'id',
      'name',
      'price',
      'resell',
      'notes',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE wine.id = vote.wine_id)'
        ),
        'vote_count',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'wine_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbWineData) => {
      const wines = dbWineData.map((wine) => wine.get({ plain: true }));
      res.render('homepage', {
        wines,
        loggedIn: req.session.loggedIn
        
      }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login


// Get wine by ID
router.get('/wine/:id', (req, res) => {
  Wine.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'name',
      'price',
      'resell',
      'notes',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE wine.id = vote.wine_id)'
        ),
        'vote_count',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'wine_id',  'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbWineData) => {
      if (!dbWineData) {
        res.status(404).json({ message: 'No wine found with this id' });
        return;
      }

      const wine = dbWineData.get({ plain: true });

      res.render('single-wine', {
        wine,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
