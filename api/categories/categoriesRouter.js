const express = require('express');
const router = express.Router();

const Categories = require('./categoriesModel');
const {
  checkValidCategory,
  checkCategoryExists,
  checkCategoryId
} = require('./categoriesMiddleware');

router.get('/', async (req, res) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get categories' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Categories.findById(id);

    if (category) {
      res.json(category);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find category with given id.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get category' });
  }
});

router.get('/:id/habits', checkCategoryId, async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await Categories.findCategoryHabits(id));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get habits' });
  }
});

router.get('/c/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const category = await Categories.findByName(name);

    if (category) {
      res.json(category);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find category with given name.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get category' });
  }
});

router.post(
  '/',
  checkValidCategory,
  checkCategoryExists,
  async (req, res, next) => {
    try {
      await Categories.add({ ...req.body }).then(newCategory =>
        res.status(201).json(newCategory)
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error adding category' });
    }
  }
);

router.put('/:id', checkCategoryId, checkValidCategory, async (req, res) => {
  const { id } = req.params;
  try {
    await Categories.update(id, { ...req.body }).then(newCategory =>
      res.status(201).json(newCategory)
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating category' });
  }
});

router.delete('/:id', checkCategoryId, async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Categories.remove(id);

    if (category) {
      res.json({
        message: 'Category successfully deleted.',
        deleted_category: category
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong... could not remove category.'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to remove category' });
  }
});

module.exports = router;
