const express = require('express');
const router = express.Router();

// Import route modules
const blogPostRoutes = require('./blogPostRoutes'); 
const userRoutes = require('./userRoutes'); 
const commentRoutes = require('./commentRoutes'); 

// Use the route modules
router.use('/blogposts', blogPostRoutes);
router.use('/users', userRoutes); 
router.use('/comments', commentRoutes); 

module.exports = router;
