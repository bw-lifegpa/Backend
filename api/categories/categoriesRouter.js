const express = require('express');
const router = express.Router();

const Categories = require('./categoriesModel');

router.get('/', async (req, res) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get categories' });
  }
});

module.exports = router;
