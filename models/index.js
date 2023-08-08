const User = require('./user');
const BlogPost = require('./blogpost');
const Comment = require('./Comment');

// Define associations
User.hasMany(BlogPost, {
  foreignKey: 'creator_id',
  onDelete: 'CASCADE',
});

BlogPost.belongsTo(User, {
  foreignKey: 'creator_id',
});

User.hasMany(Comment, {
  foreignKey: 'created_by',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'created_by',
});
Comment.belongsTo(BlogPost, {
  foreignKey: 'blog_post_id',
});

module.exports = { User, BlogPost, Comment };
