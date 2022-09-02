const User = require("./User");
const Wine = require("./Wine");
const Post = require("./Post");
const Like = require("./Like");
const Comment = require("./Comment");

User.hasMany(Wine, {
  foreignKey: "user_id",
});

Wine.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Wine, {
  through: Like,
  as: "liked_wines",
  through: "user_id",
});

Wine.belongsToMany(User, {
  through: Like,
  as: "liked_wines",
  through: "wine_id",
});

User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Post, {
  through: Like,
  as: "liked_post",
  foreignKey: "user_id",
});

Post.belongsToMany(User, {
  through: Like,
  as: "liked_posts",
  foreignKey: "post_id",
});

Post.belongsTo(Wine, {
  foreignKey: "wine_id",
});

Wine.hasMany(Post, {
  foreignKey: "wine_id",
});

Like.belongsTo(User, {
  foreignKey: "user_id",
});

Like.belongsTo(Wine, {
  foreignKey: "wine_id",
});

User.hasMany(Like, {
  foreignKey: "user_id",
});

Wine.hasMany(Like, {
  foreignKey: "wine_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Wine, {
  foreignKey: "wine_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Wine.hasMany(Comment, {
  foreignKey: "wine_id",
});

module.exports = { User, Post, Like, Wine, Comment };
