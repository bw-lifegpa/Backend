const express = require('express');
const router = express.Router();

const Users = require('./usersModel');
const { checkUserId } = require('./usersMiddleware');
const bcrypt = require('bcryptjs');

/**
 *
 * @api {get} /users List all users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} users User List
 * @apiSuccess (200) {Number} users.id User ID
 * @apiSuccess (200) {String} users.username User's username
 * @apiSuccess (200) {String} users.first_name User's first name
 * @apiSuccess (200) {String} users.last_name User's last name
 * @apiSuccess (200) {String} users.email User's email address
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      "id": 1,
 *      "username": "chelsea",
 *      "first_name": "Chelsea",
 *      "last_name": "Machen",
 *      "email": "chelsea@gmail.com"
 *    },
 *    {
 *      . . .
 *    }
 *  ]
 *
 * @apiErrorExample {json} List error
 *  HTTP/1.1 500 Internal Server Error
 *
 */
router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error getting users' });
  }
});

/**
 *
 * @api {get} /users/:id Get user by ID
 * @apiName GetUserByID
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id User ID
 *
 * @apiSuccess (200) {Number} id User ID
 * @apiSuccess (200) {String} username User's username
 * @apiSuccess (200) {String} password User's password hash
 * @apiSuccess (200) {String} first_name User's first name
 * @apiSuccess (200) {String} last_name User's last name
 * @apiSuccess (200) {String} email User's email address
 * @apiSuccess (200) {String} created_at Timestamp when user was created
 * @apiSuccess (200) {String} updated_at Timestamp when user was last updated
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "username": "chelsea",
 *    "password": "fasdfuafaefnnknfwaunifw",
 *    "first_name": "Chelsea",
 *    "last_name": "Machen",
 *    "email": "chelsea@gmail.com"
 *  }
 *
 * @apiError UserNotFound The User was not found.
 *
 * @apiErrorExample {json} User not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find user."
 *  }
 *
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: `Could not find user with id ${id}.` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user' });
  }
});

/**
 *
 * @api {get} /users/u/:username Get user by username
 * @apiName GetUserByUsername
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {username} username User's username
 *
 * @apiSuccess (200) {Number} users.id User ID
 * @apiSuccess (200) {String} users.username User's username
 * @apiSuccess (200) {String} users.password User's password hash
 * @apiSuccess (200) {String} users.first_name User's first name
 * @apiSuccess (200) {String} users.last_name User's last name
 * @apiSuccess (200) {String} users.email User's email address
 * @apiSuccess (200) {String} users.created_at Timestamp when user was created
 * @apiSuccess (200) {String} users.updated_at Timestamp when user was last updated
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "username": "chelsea",
 *    "password": "fasdfuafaefnnknfwaunifw",
 *    "first_name": "Chelsea",
 *    "last_name": "Machen",
 *    "email": "chelsea@gmail.com"
 *  }
 *
 * @apiError UserNotFound The User was not found.
 *
 * @apiErrorExample {json} User not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find user."
 *  }
 *
 */
router.get('/u/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await Users.findByUsername(username);

    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: `Could not find user with username ${username}` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user' });
  }
});

/**
 *
 * @api {put} /users/:id Edit user information
 * @apiName EditUserByID
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id User ID
 *
 * @apiParam {Number} [id] User ID
 * @apiParam {String} [username] User's username
 * @apiParam {String} [password] User's password hash
 * @apiParam {String} [first_name] User's first name
 * @apiParam {String} [last_name] User's last name
 * @apiParam {String} [email] User's email address
 *
 * @apiParamExample {json}
 *  {
 *    "first_name": "George",
 *    "email": "george@aol.com"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *    "message": "User successfully updated."
 *    "user": {
 *      "id": 1,
 *      "username": "chelsea",
 *      "password": "fasdfuafaefnnknfwaunifw",
 *      "first_name": "Chelsea",
 *      "last_name": "Machen",
 *      "email": "chelsea@gmail.com"
 *    }
 *  }
 *
 * @apiError UserNotFound The User was not found.
 *
 * @apiErrorExample {json} User not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find user."
 *  }
 *
 */
router.put('/:id', checkUserId, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (changes.password)
    changes.password = bcrypt.hashSync(changes.password, 12);

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

/**
 *
 * @api {get} /users/:id/habits Get user habits
 * @apiName GetUserHabits
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id User ID
 *
 * @apiSuccess (200) {Object[]} habits List of User's Habits
 * @apiSuccess (200) {Number} habits.habit_id Habit ID
 * @apiSuccess (200) {String} habits.name Habit's name
 * @apiSuccess (200) {String} habits.description Habit's description
 * @apiSuccess (200) {Number} habits.weighting This habit's significance level to the user. Reserved for future use
 * @apiSuccess (200) {String} habits.theme_color The user's chosen theme/color for this habit. Reserved for future use
 * @apiSuccess (200) {String} habits.start_date Timestamp for start date of habit. Format YYYY-MM-DD HH:MM:SS
 * @apiSuccess (200) {String} habits.end_date Timestamp for end date of habit. Format YYYY-MM-DD HH:MM:SS
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      "habit_id": 1,
 *      "name": "Yoga for 30 minutes",
 *      "description": "Find inner peace",
 *      "weighting": 0,
 *      "theme_color": null,
 *      "start_date": "2019-08-27 19:15:30",
 *      "end_date": "2019-09-05 19:15:30"
 *    },
 *    {
 *      . . .
 *    }
 * ]
 *
 * @apiError UserNotFound The User was not found.
 *
 * @apiErrorExample {json} User not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find user."
 *  }
 *
 */
router.get('/:id/habits', checkUserId, async (req, res) => {
  const { id } = req.params;

  try {
    res.json(await Users.findUserHabits(id));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get user habits' });
  }
});

/**
 *
 * @api {post} /users/:id/habits Add habit to user
 * @apiName AddUserHabits
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id User ID
 *
 * @apiParam {Number} habit_id
 *
 * @apiSuccess (200) {String} message Success message
 * @apiSuccess (200) {Object[]} habits Updated list of User's Habits
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   "message": "Habit {id: 6} added successfully.",
 *   "habits": [
 *     {
 *       "habit_id": 1,
 *       "name": "Yoga for 30 minutes",
 *       "description": "Find inner peace",
 *       "weighting": 0,
 *       "theme_color": null,
 *       "start_date": "2019-08-27 19:15:30",
 *       "end_date": "2019-09-05 19:15:30"
 *     },
 *     {
 *       . . .
 *     }
 *   ]
 * }
 *
 * @apiError UserNotFound The User was not found.
 *
 * @apiErrorExample {json} User not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find user."
 *  }
 *
 * @apiError HabitNotFound The Habit with the specified habit_id was not found.
 *
 * @apiErrorExample {json} Habit not found
 *  HTTP/1.1 500
 *  {
 *    "message": "Failed to add habit to user"
 *  }
 *
 */
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

/**
 *
 * @api {get} /users/:id/habits/completed Get user's completed habits
 * @apiName GetUserCompletedHabits
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id User ID
 *
 * @apiSuccess (200) {Object[]} habits Record of User's completed Habits
 * @apiSuccess (200) {Number} habits.habit_id Habit ID
 * @apiSuccess (200) {String} habits.name Habit's name
 * @apiSuccess (200) {String} habits.completed_at Timestamp for when habit was completed. Format YYYY-MM-DD HH:MM:SS
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      "habit_id": 1,
 *      "name": "Yoga for 30 minutes",
 *      "completed_at": "2019-09-05 19:15:30"
 *    },
 *    {
 *      . . .
 *    }
 * ]
 *
 * @apiError UserNotFound The User was not found.
 *
 * @apiErrorExample {json} User not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find user."
 *  }
 *
 */
router.get('/:id/habits/completed', checkUserId, async (req, res) => {
  const { id } = req.params;
  const { habit_id } = req.body;

  try {
    const records = await Users.getCompletedHabits(id, habit_id);
    console.log(records);
    if (Array.isArray(records) && records.length === 0)
      res
        .status(200)
        .json({ message: 'User has no record of completed habits' });
    else res.status(200).json(records);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get user habits' });
  }
});

/**
 *
 * @api {get} /users/:id/habits/completed/:habit_id Get user's completion record for habit
 * @apiName GetUserRecordForHabit
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id User ID
 * @apiParam {habit_id} habit_id Habit ID
 *
 * @apiSuccess (200) {Object[]} habits Record of completion for habit
 * @apiSuccess (200) {String} habits.completed_at Timestamp for when habit was completed. Format YYYY-MM-DD HH:MM:SS
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      "completed_at": "2019-09-05 19:15:30"
 *    },
 *    {
 *      . . .
 *    }
 * ]
 *
 * @apiError UserNotFound The User was not found.
 *
 * @apiErrorExample {json} User not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find user."
 *  }
 *
 */
router.get('/:id/habits/completed/:habit_id', checkUserId, async (req, res) => {
  const { id } = req.params;
  const { habit_id } = req.params;

  try {
    res.status(200).json(await Users.getCompletedHabits(id, habit_id));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get user habits' });
  }
});

/**
 *
 * @api {post} /users/:id/habits/completed Mark a habit completed for user's record
 * @apiName MarkHabitCompleted
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id User ID
 * @apiParam {Number} habit_id Habit ID
 * @apiParam {String} [completed_at=now] Timestamp for when habit was completed. Defaults to now. Format YYYY-MM-DD HH:MM:SS
 *
 * @apiSuccess (200) {String} message Success message
 * @apiSuccess (200) {Object[]} habits Record of completion for habit
 * @apiSuccess (200) {String} habits.completed_at Timestamp for when habit was completed. Format YYYY-MM-DD HH:MM:SS
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message": "Habit {id: 2} marked complete.",
 *    "record": [
 *      {
 *        "completed_at": "2019-09-05 19:15:30"
 *      },
 *      {
 *        . . .
 *      }
 *    ]
 *  }
 *
 * @apiError UserNotFound The User was not found.
 *
 * @apiErrorExample {json} User not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find user."
 *  }
 *
 * @apiError UserNotFollowingHabit The user is not tracking this habit
 *
 * @apiErrorExample {json} User not found
 *  HTTP/1.1 400
 *  {
 *    "message": "User is not tracking habit. Add habit to user first before marking as complete"
 *  }
 *
 */
router.post('/:id/habits/completed', checkUserId, async (req, res) => {
  const { id } = req.params;
  const { habit_id, completed_at } = req.body;
  if (habit_id) {
    try {
      res.json(await Users.markHabitCompleted(id, habit_id, completed_at));
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to add habit to user' });
    }
  } else {
    res.status(400).json({
      message:
        'Please send `habit_id` parameter in body. Optionally, also send `completed_at` parameter (will default to now)'
    });
  }
});

/**
 *
 * @api {delete} /users/:id/habits/ Remove a habit from a user
 * @apiName RemoveUserHabit
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id User ID
 * @apiParam {Number} habit_id Habit ID
 *
 * @apiSuccess (200) {String} message Success message
 * @apiSuccess (200) {Object[]} habits Updated list of User's Habits
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   "message": "Habit {id: 4} removed from user.",
 *   "habits": [
 *     {
 *       "habit_id": 1,
 *       "name": "Yoga for 30 minutes",
 *       "description": "Find inner peace",
 *       "weighting": 0,
 *       "theme_color": null,
 *       "start_date": "2019-08-27 19:15:30",
 *       "end_date": "2019-09-05 19:15:30"
 *     },
 *     {
 *       . . .
 *     }
 *   ]
 * }
 *
 * @apiErrorExample {json} User not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find user."
 *  }
 *
 * @apiError UserNotFollowingHabit The user is not tracking this habit
 *
 * @apiErrorExample {json} User not found
 *  HTTP/1.1 400
 *  {
 *    "message": "User is not tracking habit. Add habit to user first before marking as complete"
 *  }
 *
 */
router.delete('/:id/habits', checkUserId, async (req, res) => {
  const { id } = req.params;
  const { habit_id } = req.body;
  if (habit_id) {
    try {
      const removed = await Users.removeHabitFromUser(id, habit_id);
      if (removed)
        res.status(200).json({
          message: `Habit {id: ${habit_id}} removed from user`,
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

module.exports = router;
