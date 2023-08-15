const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment'); 



// Create a new comment
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.session.userId; // Assuming you have the user's ID in the session
    const blogPostId = req.body.blog_post_id; // Assuming you passed this in the form

    await Comment.create({
      content,
      created_by: userId, // Assign the user's ID as the created_by value
      blog_post_id: blogPostId, // Assign the blog post ID
    });

    // Redirect to the homepage
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single comment by ID
router.get('/:id', async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByPk(commentId);
    
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      res.status(200).json(comment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a comment by ID
router.put('/:id', async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body;

    const [rowsUpdated, [updatedComment]] = await Comment.update(
      { content },
      { where: { id: commentId }, returning: true }
    );

    if (rowsUpdated === 0) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      res.status(200).json(updatedComment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a comment by ID
router.delete('/:id', async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedCount = await Comment.destroy({ where: { id: commentId } });

    if (deletedCount === 0) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      res.status(204).send(); // 204 No Content
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
