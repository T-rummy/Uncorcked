const router = require("express").Router();
const { User, Wine, Comment, Vote } = require("../../models");
const sequelize = require("../../config/connection");
  const withAuth = require("../../utils/auth");

// Get all wines
router.get("/", (req, res) => {
  Wine.findAll({
    attributes: [
      "id",
      "name",
      "size",
      "price",
      "resell",
      "notes",
      "userId",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE wine.id = vote.wine_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "wine_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbWineData) => res.json(dbWineData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get wine by ID
router.get("/:id", (req, res) => {
  Wine.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "name",
      "size",
      "price",
      "resell",
      "notes",
      "userId",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE wine.id = vote.wine_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "wine_id", "userId", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbWineData) => {
      if (!dbWineData) {
        res.status(404).json({ message: "No Wine found with this id" });
        return;
      }
      res.json(dbWineData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



// router.post("/", withAuth, (req, res) => {
  
//     Wine.create({
//     name: req.body.name,
//     bottle_size: req.body.bottle_size,
//     price_paid: req.body.price_paid,
//     resell_value: req.body.resell_value,
//     notes: req.body.notes,
//     user_id: req.session.user_id
//     })
  
//       .then((dbWineData) => res.json(dbWineData))
//       .catch((err) => {
//         console.log(err);
//         res.status(400).json(err);
//       });
  
// });

router.post('/', withAuth,(req, res) => {

  if (req.session) {
    Wine.create({
      name: req.body.name,
      size: req.body.size,
      price: req.body.price,
      resell: req.body.resell,
      notes: req.body.notes,
      userId: req.session.userId
    })
      .then(dbWineData => res.json(dbWineData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

//Wine voting route
router.put("/upvote", withAuth,  (req, res) => {
  if (req.session) {
    Wine.upvote(
      { ...req.body, userId: req.session.userId },
      { Vote, Comment, User }
    )
      .then((updatedVoteData) => res.json(updatedVoteData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// Delete Wines
router.delete("/:id", withAuth,(req, res) => {
  Wine.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbWineData) => {
      if (!dbWineData) {
        res.status(404).json({ message: "No Wine found with this id" });
        return;
      }
      res.json(dbWineData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
