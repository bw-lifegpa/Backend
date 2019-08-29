const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const usersModel = require('../users/usersModel');

const {
  checkUserCreds,
  checkUserExists,
  getJwtToken
} = require('./authMiddleware');

/**
 *
 * @api {post} /auth/register Register new user
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} username User username
 * @apiParam {String} password User password
 * @apiParam {String} [email] User's email address
 * @apiParam {String} [first_name] User's first name
 * @apiParam {String} [last_name] User's last name
 *
 * @apiSuccess {Number} id User ID
 * @apiSuccess {String} username User's username
 * @apiSuccess {String} token User's Authorization token
 *
 * @apiParamExample {json}
 *  {
 *    "username": "lauren",
 *    "password": "hunter2",
 *    "email": "lauren@gmail.com",
 *    "first_name": "Lauren",
 *    "last_name": "Epstein"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 201 Created
 * {
 *   "id": 6,
 *   "username": "lauren",
 *   "email": "lauren@gmail.com",
 *   "first_name": "Lauren",
 *   "last_name": "Epstein",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhdXJlbjIiLCJpYXQiOjE1NjY5NjQwMTEsImV4cCI6MTU2Njk5MjgxMX0.obJuqN2dWQa5sX6QTNDrQ1o5wUqm4hWjXnhJ8hagiV4"
 * }
 *
 * @apiError MissingParameters Missing required parameters
 *
 * @apiErrorExample {json} Missing required parameters
 *  HTTP/1.1 400
 *  {
 *    "message": "Please send username and password"
 *  }
 *
 */
router.post('/register', checkUserCreds, checkUserExists, async (req, res) => {
  const { username, password, email, first_name, last_name } = req.body;
  try {
    const digest = bcrypt.hashSync(password, 12);
    await usersModel
      .add({
        username: username,
        password: digest,
        email: email || null,
        first_name: first_name || null,
        last_name: last_name || null
      })
      .then(
        newUser =>
          res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email || null,
            first_name: newUser.first_name || null,
            last_name: newUser.last_name || null,
            token: getJwtToken(newUser)
          })
        // res.status(201).json(newUser);
      );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Could not register user' });
  }
});

/**
 *
 * @api {post} /auth/login Login user
 * @apiName LoginUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} username User username
 * @apiParam {String} password User password
 *
 * @apiSuccess {Number} id User ID
 * @apiSuccess {String} username User's username
 * @apiSuccess {String} token User's Authorization token
 *
 * @apiParamExample {json}
 *  {
 *    "username": "lauren",
 *    "password": "hunter2"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   "id": 6,
 *   "username": "lauren",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhdXJlbjIiLCJpYXQiOjE1NjY5NjQwMTEsImV4cCI6MTU2Njk5MjgxMX0.obJuqN2dWQa5sX6QTNDrQ1o5wUqm4hWjXnhJ8hagiV4"
 * }
 *
 * @apiError MissingParameters Missing required parameters
 *
 * @apiErrorExample {json} Missing required parameters
 *  HTTP/1.1 400
 *  {
 *    "message": "Please send username and password"
 *  }
 *
 */
router.post('/login', checkUserCreds, (req, res, next) => {
  const { username, password } = req.body;
  usersModel
    .findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // req.session.username = username;
        res.status(200).json({
          id: user.id,
          username: user.username,
          token: getJwtToken(user)
        });
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
