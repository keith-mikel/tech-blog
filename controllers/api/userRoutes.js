const express = require('express');
const router = express.Router();
const User = require('../../models/User');


// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const [rowsUpdated, [updatedUser]] = await User.update(
      { name, email, password },
      { where: { id: userId }, returning: true }
    );

    if (rowsUpdated === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedCount = await User.destroy({ where: { id: userId } });

    if (deletedCount === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(204).send(); // 204 No Content
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
