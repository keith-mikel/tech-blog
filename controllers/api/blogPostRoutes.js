const express = require('express');
const router = express.Router();
const BlogPost = require('../../models/BlogPost'); 


// Create a new blog post
router.post('/', async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = await BlogPost.create({ title, body });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll();
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const blogPost = await BlogPost.findByPk(postId);
    
    if (!blogPost) {
      res.status(404).json({ message: 'Blog Post not found' });
    } else {
      res.status(200).json(blogPost);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a blog post by ID
router.put('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, body } = req.body;

    const [rowsUpdated, [updatedPost]] = await BlogPost.update(
      { title, body },
      { where: { id: postId }, returning: true }
    );

    if (rowsUpdated === 0) {
      res.status(404).json({ message: 'Blog Post not found' });
    } else {
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a blog post by ID
router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedCount = await BlogPost.destroy({ where: { id: postId } });

    if (deletedCount === 0) {
      res.status(404).json({ message: 'Blog Post not found' });
    } else {
      res.status(204).send(); // 204 No Content
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
