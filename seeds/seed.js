const fs = require('fs');
const path = require('path');
const { sequelize } = require('../models');
const { User, BlogPost, Comment } = require('../models');
const usersSeedData = require('./users.json');
const blogPostsSeedData = require('./blogposts.json');
const commentsSeedData = require('./comments.json');

(async () => {
  try {
    // Sync models with the database
    await sequelize.sync({ force: true });

    // Seed Users
    await User.bulkCreate(usersSeedData, { individualHooks: true });
    console.log('Users seeding complete.');

    // Seed Blog Posts
    const blogPosts = await BlogPost.bulkCreate(blogPostsSeedData, { returning: true });
    console.log('Blog Posts seeding complete.');

    // Seed Comments
    for (const blogPost of blogPosts) {
      const relatedComments = commentsSeedData.filter(comment => comment.blog_post_id === blogPost.id);
      await Comment.bulkCreate(relatedComments);
      console.log(`Comments for Blog Post ${blogPost.id} seeded.`);
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
})();
