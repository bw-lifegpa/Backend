const express = require('express');
const router = express.Router();

const Habits = require('./habitsModel');

router.get('/', async (req, res) => {
  try {
    const habits = await Habits.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get habits' });
  }
});

module.exports = router;
