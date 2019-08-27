const express = require('express');
const router = express.Router();

const Habits = require('./habitsModel');
const {
  checkValidHabit,
  checkHabitExists,
  checkHabitId
} = require('./habitsMiddleware');

router.get('/', async (req, res) => {
  try {
    const habits = await Habits.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get habits' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const habit = await Habits.findById(id);

    if (habit) {
      res.json(habit);
    } else {
      res.status(404).json({ message: 'Could not find habit with given id.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get habit' });
  }
});

router.get('/:id/categories', checkHabitId, async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await Habits.findHabitCategories(id));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get categories' });
  }
});

router.post('/:id/categories', checkHabitId, async (req, res) => {
  const { id } = req.params;
  const { category_id } = req.body;
  if (category_id) {
    try {
      res.json(await Habits.addCategoryToHabit(id, category_id));
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to add category to habit' });
    }
  } else {
    res
      .status(400)
      .json({ message: 'Please send `category_id` parameter in body' });
  }
});

router.get('/name/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const habit = await Habits.findByName(name);

    if (habit) {
      res.json(habit);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find habit with given name.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get habit' });
  }
});

router.post('/', checkValidHabit, checkHabitExists, async (req, res, next) => {
  try {
    await Habits.add({ ...req.body }).then(newHabit =>
      res.status(201).json(newHabit)
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error adding habit' });
  }
});

router.put('/:id', checkHabitId, checkValidHabit, async (req, res) => {
  const { id } = req.params;
  try {
    await Habits.update(id, { ...req.body }).then(newHabit =>
      res.status(201).json(newHabit)
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating habit' });
  }
});

router.delete('/:id', checkHabitId, async (req, res) => {
  const { id } = req.params;

  try {
    const habit = await Habits.remove(id);

    if (habit) {
      res.json({
        message: 'Habit successfully deleted.',
        deleted_habit: habit
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong... could not remove habit.'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to remove habit' });
  }
});

module.exports = router;
