const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// const { truncate } = require("./User");

// create our Post model
class Wine extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      wine_id: body.wine_id,
    }).then(() => {
      return Wine.findOne({
        where: {
          id: body.wine_id,
        }
        // attributes: [
        //   "id",
        //   "name",
        //   "size",
        //   "price",
        //   "resell",
        //   "userId",
        //   [
        //     sequelize.literal(
        //       "(SELECT COUNT(*) FROM vote WHERE wine.id = vote.wine_id)"
        //     ),
        //     "vote_count",
        //   ],
        // ],
      });
    });
  }
}

// create fields/columns for Post model
Wine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // We talked about limiting the number of preselected...will need to work in to code
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true,
     
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
     
    },
    resell: {
      type: DataTypes.INTEGER,
      alllowNull: true,
      
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "wine",
  }
);

module.exports = Wine;
