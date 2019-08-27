const express = require('express');
const router = express.Router();

const Users = require('./usersModel');
const { checkUserId } = require('./usersMiddleware');

router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error getting users' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user' });
  }
});

router.put('/:id', checkUserId, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const user = await Users.findById(id);

    res.status(201).json({
      message: 'User successfully updated',
      user: await Users.update(id, { ...user, ...changes })
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to edit user' });
  }
});

router.get('/:id/habits', checkUserId, async (req, res) => {
  const { id } = req.params;

  try {
    res.json(await Users.findUserHabits(id));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get user habits' });
  }
});

router.post('/:id/habits', checkUserId, async (req, res) => {
  const { id } = req.params;
  const { habit_id } = req.body;
  if (habit_id) {
    try {
      res.json(await Users.addHabitToUser(id, habit_id));
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to add habit to user' });
    }
  } else {
    res
      .status(400)
      .json({ message: 'Please send `habit_id` parameter in body' });
  }
});

router.delete('/:id/habits', checkUserId, async (req, res) => {
  const { id } = req.params;
  const { habit_id } = req.body;
  if (habit_id) {
    try {
      const removed = await Users.removeHabitFromUser(id, habit_id);
      if (removed)
        res.status(200).json({
          message: 'Habit removed from user',
          habits: await Users.findUserHabits(id)
        });
      else res.status(400).json({ message: 'User does not have habit' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to remove habit from user' });
    }
  } else {
    res
      .status(400)
      .json({ message: 'Please send `habit_id` parameter in body' });
  }
});

router.get('/u/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await Users.findByUsername(username);

    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find user with given username.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user' });
  }
});

module.exports = router;
