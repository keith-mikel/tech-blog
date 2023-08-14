const express = require('express');
const router = express.Router();
const { BlogPost, Comment, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const blogPostsData = await BlogPost.findAll({
            include: [{ model: Comment},{model: User}],
        });
        const blogPosts = blogPostsData.map((blogPost) => blogPost.get({plain: true}));
        res.render('home', { blogPosts, loggedIn: req.session.loggedIn  });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

module.exports = router;
