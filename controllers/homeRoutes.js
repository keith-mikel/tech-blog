const express = require('express');
const router = express.Router();
const { BlogPost, Comment, User } = require('../models');

//homepage
router.get('/', async (req, res) => {
    try {
        const blogPostsData = await BlogPost.findAll({
            include: [
                { model: Comment, include: [{ model: User, as: 'user' }]},
                { model: User, as: 'user' } // Include the User model and alias it as 'user'
            ],
        });

        const blogPosts = blogPostsData.map((blogPost) => {
            const plainBlogPost = blogPost.get({ plain: true });

            return plainBlogPost;
        });

        res.render('home', { blogPosts, loggedIn: req.session.loggedIn });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

//dashboard
router.get('/dashboard', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect('/login'); // Redirect to login if not logged in
        }

        const loggedInUserId = req.session.userId; 
        const blogPostsData = await BlogPost.findAll({
            include: [{ model: Comment }, { model: User }],
            where: { created_by: loggedInUserId }, // Filter by logged-in user's posts
        });

        const blogPosts = blogPostsData.map((blogPost) => blogPost.get({ plain: true }));
        res.render('dash', { blogPosts, loggedIn: req.session.loggedIn });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


//new post
router.get('/new', (req, res) => {
    // Check if user is logged in, otherwise redirect to login
    if (!req.session.loggedIn) {
        return res.redirect('/login');
    }

    res.render('new-post', {loggedIn: req.session.loggedIn}); // Assuming you have a template named new-post.ejs
});

router.get('/post/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        const blogPostData = await BlogPost.findByPk(postId, {
            include: [
                { model: Comment },
                { model: User }
            ],
        });

        if (!blogPostData) {
            return res.status(404).send('Blog post not found');
        }

        const blogPost = blogPostData.get({ plain: true });

        res.render('post', { blogPost, loggedIn: req.session.loggedIn });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});
//update post
router.get('/update/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        const blogPostData = await BlogPost.findByPk(postId, {
            include: [
                { model: Comment },
                { model: User }
            ],
        });

        if (!blogPostData) {
            return res.status(404).send('Blog post not found');
        }

        const blogPost = blogPostData.get({ plain: true });

        res.render('update', { blogPost, loggedIn: req.session.loggedIn });
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
