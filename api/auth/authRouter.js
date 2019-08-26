const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const usersModel = require('../users/usersModel');

const {
  checkUserCreds,
  checkUserExists,
  getJwtToken
} = require('./authMiddleware');

router.post('/register', checkUserCreds, checkUserExists, async (req, res) => {
  const { username, password } = req.body;
  try {
    const digest = bcrypt.hashSync(password, 12);
    await usersModel
      .add({
        username: username,
        password: digest
      })
      .then(
        newUser =>
          res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            token: getJwtToken(newUser)
          })
        // res.status(201).json(newUser);
      );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Could not register user' });
  }
});

router.post('/login', checkUserCreds, (req, res, next) => {
  const { username, password } = req.body;
  usersModel
    .findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // req.session.username = username;
        res
          .status(200)
          .json({ message: `Welcome ${username}!`, token: getJwtToken(user) });
      } else res.status(401).json({ message: 'Invalid creds' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error logging in' });
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.status(200).json({ message: 'goodbye' });
  });
});

module.exports = router;
