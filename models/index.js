const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// Define associations
User.hasMany(BlogPost, {
  foreignKey: 'creator_id',
  onDelete: 'CASCADE',
});

BlogPost.belongsTo(User, {
  foreignKey: 'created_by',
});

User.hasMany(Comment, {
  foreignKey: 'created_by',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'created_by',
});

BlogPost.hasMany(Comment, {
  foreignKey: 'blog_post_id',
  onDelete: 'CASCADE',
}

)
Comment.belongsTo(BlogPost, {
  foreignKey: 'blog_post_id',
});

module.exports = { User, BlogPost, Comment };
