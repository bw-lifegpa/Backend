const express = require('express');
const router = express.Router();

const Users = require('./usersModel');

router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error getting users' });
  }
});

router.get('/id/:id', async (req, res) => {
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

router.get('/:username', async (req, res) => {
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
