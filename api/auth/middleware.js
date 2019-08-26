require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('../config');

const usersModel = require('../users/usersModel');

async function checkUserCreds(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password)
    res.status(400).json({ message: 'Send a username and password in body' });
  else next();
}

async function checkUserExists(req, res, next) {
  const { username } = req.body;
  try {
    const userInDb = await usersModel.findByUsername(username);
    if (userInDb && userInDb.username === username) {
      res.status(401).json({ message: 'Username already in use' });
    } else next();
  } catch (err) {
    res.status(500).json({ message: 'Error accessing users' });
  }
}

function getJwtToken(user) {
  const payload = {
    username: user.username
  };
  const secret = config.development.JWT_SECRET;
  const options = {
    expiresIn: '8h'
  };
  return jwt.sign(payload, secret, options);
}

module.exports = {
  checkUserCreds,
  checkUserExists,
  getJwtToken
};
