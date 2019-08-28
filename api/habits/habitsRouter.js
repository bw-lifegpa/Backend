const express = require('express');
const router = express.Router();

const Habits = require('./habitsModel');
const {
  checkValidHabit,
  checkHabitExists,
  checkHabitId
} = require('./habitsMiddleware');

/**
 *
 * @api {get} /habits List all habits
 * @apiName GetUsers
 * @apiGroup Habits
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} habits Habit List
 * @apiSuccess (200) {Number} habits.id Habit ID
 * @apiSuccess (200) {String} habits.name Habit's name
 * @apiSuccess (200) {String} habits.description Habit's description
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      "id": 1,
 *      "name": "Swim laps",
 *      "description": "Good for heart health"
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
    const habits = await Habits.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get habits' });
  }
});

/**
 *
 * @api {get} /habits/:id Get habit by ID
 * @apiName GetHabitByID
 * @apiGroup Habits
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id Habit ID
 *
 * @apiSuccess (200) {Number} id Habit ID
 * @apiSuccess (200) {String} name Habit's name
 * @apiSuccess (200) {String} description Habit's description
 * @apiSuccess (200) {Number} created_by ID of user that created the habit
 * @apiSuccess (200) {Number} created_at Timestamp of when habit was created
 * @apiSuccess (200) {Number} updated_at Timestamp of when habit was last updated
 * @apiSuccess (200) {Object[]} categories List of associated categories
 * @apiSuccess (200) {Number} categories.id Category ID
 * @apiSuccess (200) {String} categories.name Name of category
 * @apiSuccess (200) {String} categories.description Description of category
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "name": "Swim laps",
 *    "description": "Good for heart health",
 *    "created_by": 1,
 *    "created_at": "2019-08-27 15:32:55",
 *    "updated_at": "2019-08-30 04:51:31",
 *    "categories": [
 *      {
 *        "id": 2,
 *        "name": "Health",
 *        "description": "Habits for health"
 *      },
 *      {
 *        . . .
 *      }
 *    ]
 *  }
 *
 * @apiError UserNotFound The Habit was not found.
 *
 * @apiErrorExample {json} Habit not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find habit."
 *  }
 *
 */
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

/**
 *
 * @api {get} /habits/:id Get habit by name
 * @apiName GetHabitByName
 * @apiGroup Habits
 * @apiVersion 1.0.0
 *
 * @apiParam {name} name Habit Name
 *
 * @apiSuccess (200) {Number} id Habit ID
 * @apiSuccess (200) {String} name Habit's name
 * @apiSuccess (200) {String} description Habit's description
 * @apiSuccess (200) {Number} created_by ID of user that created the habit
 * @apiSuccess (200) {Number} created_at Timestamp of when habit was created
 * @apiSuccess (200) {Number} updated_at Timestamp of when habit was last updated
 * @apiSuccess (200) {Object[]} categories List of associated categories
 * @apiSuccess (200) {Number} categories.id Category ID
 * @apiSuccess (200) {String} categories.name Name of category
 * @apiSuccess (200) {String} categories.description Description of category
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "name": "Swim laps",
 *    "description": "Good for heart health",
 *    "created_by": 1,
 *    "created_at": "2019-08-27 15:32:55",
 *    "updated_at": "2019-08-30 04:51:31",
 *    "categories": [
 *      {
 *        "id": 2,
 *        "name": "Health",
 *        "description": "Habits for health"
 *      },
 *      {
 *        . . .
 *      }
 *    ]
 *  }
 *
 * @apiError UserNotFound The Habit was not found.
 *
 * @apiErrorExample {json} Habit not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find habit."
 *  }
 *
 */
router.get('/h/:name', async (req, res) => {
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

/**
 *
 * @api {get} /habits/:id/categories Get habit's categories
 * @apiName GetHabitCategories
 * @apiGroup Habits
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id Habit ID
 *
 * @apiSuccess (200) {Object[]} categories List of associated categories
 * @apiSuccess (200) {Number} categories.id Category ID
 * @apiSuccess (200) {String} categories.name Name of category
 * @apiSuccess (200) {String} categories.description Description of category
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      "id": 2,
 *      "name": "Health",
 *      "description": "Habits for health"
 *    },
 *    {
 *      . . .
 *    }
 *  ]
 *
 * @apiError UserNotFound The Habit was not found.
 *
 * @apiErrorExample {json} Habit not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find habit."
 *  }
 *
 */
router.get('/:id/categories', checkHabitId, async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await Habits.findHabitCategories(id));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get categories' });
  }
});

/**
 *
 * @api {post} /habits/:id/categories Add category to habit
 * @apiName AddHabitCategory
 * @apiGroup Habits
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id Habit ID
 *
 * @apiParam {Number} category_id Category ID
 *
 * @apiSuccess (200) {String} message Success message
 * @apiSuccess (200) {Object[]} categories Updated list of Habit's categories
 * @apiSuccess (200) {Number} categories.id Category ID
 * @apiSuccess (200) {String} categories.name Name of category
 * @apiSuccess (200) {String} categories.description Description of category
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    "category_id": 6
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   "message": "Category {id: 6} added successfully.",
 *   "categories": [
 *     {
 *       "category_id": 1,
 *       "name": "Health",
 *       "description": "For your health!"
 *     },
 *     {
 *       . . .
 *     }
 *   ]
 * }
 *
 * @apiError HabitNotFound The Habit was not found.
 *
 * @apiErrorExample {json} Habit not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find habit."
 *  }
 *
 * @apiError CategoryNotFound The Category with the specified category_id was not found.
 *
 * @apiErrorExample {json} Category not found
 *  HTTP/1.1 500
 *  {
 *    "message": "Failed to add category to habit"
 *  }
 *
 */
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

/**
 *
 * @api {delete} /habits/:id/categories/ Remove a category from a habit
 * @apiName RemoveHabitCategory
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id Habit ID
 * @apiParam {Number} category_id Category ID
 *
 * @apiSuccess (200) {String} message Success message
 * @apiSuccess (200) {Object[]} categories Updated list of Habit's categories
 * @apiSuccess (200) {Number} categories.id Category ID
 * @apiSuccess (200) {String} categories.name Name of category
 * @apiSuccess (200) {String} categories.description Description of category
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   "message": "Category {id: 6} removed successfully.",
 *   "categories": [
 *     {
 *       "category_id": 1,
 *       "name": "Health",
 *       "description": "For your health!"
 *     },
 *     {
 *       . . .
 *     }
 *   ]
 * }
 *
 * @apiError HabitNotFound The Habit was not found.
 *
 * @apiErrorExample {json} Habit not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find habit."
 *  }
 *
 * @apiError CategoryNotFound The Category with the specified category_id was not found.
 *
 * @apiErrorExample {json} Category not found
 *  HTTP/1.1 500
 *  {
 *    "message": "Failed to remove category from habit"
 *  }
 *
 */
router.delete('/:id/categories', checkHabitId, async (req, res) => {
  const { id } = req.params;
  const { category_id } = req.body;
  if (category_id) {
    try {
      const removed = await Habits.removeCategoryFromHabit(id, category_id);
      if (removed)
        res.status(200).json({
          message: 'Category removed from habit',
          categories: await Habits.findHabitCategories(id)
        });
      else res.status(400).json({ message: 'Habit does not have category' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to remove category from habit' });
    }
  } else {
    res
      .status(400)
      .json({ message: 'Please send `category_id` parameter in body' });
  }
});

/**
 *
 * @api {post} /habits Add new habit
 * @apiName AddNewHabit
 * @apiGroup Habits
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Habit's name
 * @apiParam {String} [description] Habit's description
 * @apiParam {String} [created_by] User ID of habit creator
 *
 * @apiSuccess (200) {Number} id Habit ID
 * @apiSuccess (200) {String} name Habit's name
 * @apiSuccess (200) {String} description Habit's description
 * @apiSuccess (200) {Number} created_by ID of user that created the habit
 * @apiSuccess (200) {Number} created_at Timestamp of when habit was created
 * @apiSuccess (200) {Number} updated_at Timestamp of when habit was last updated
 * @apiSuccess (200) {Object[]} categories List of habit's categories
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    "name": "Call mom",
 *    "description": "Give her a call tonight",
 *    "created_by": 3
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *    "id": 9,
 *    "name": "Call mom",
 *    "description": "Give her a call tonight",
 *    "created_by": 3,
 *    "created_at": "2019-08-27 15:32:55",
 *    "updated_at": "2019-08-30 04:51:31",
 *    "categories": []
 *  }
 *
 * @apiError MissingParams Missing required parameters
 *
 * @apiErrorExample {json} Missing required parameters
 *  HTTP/1.1 400
 *  {
 *    "message": "Send a name in request body"
 *  }
 *
 */
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

/**
 *
 * @api {put} /habits/:id Edit habit
 * @apiName EditHabit
 * @apiGroup Habits
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Habit ID
 * @apiParam {String} [name] Habit's name
 * @apiParam {String} [description] Habit's description
 * @apiParam {String} [created_by] User ID of habit creator
 *
 * @apiSuccess (200) {Number} id Habit ID
 * @apiSuccess (200) {String} name Habit's name
 * @apiSuccess (200) {String} description Habit's description
 * @apiSuccess (200) {Number} created_by ID of user that created the habit
 * @apiSuccess (200) {Number} created_at Timestamp of when habit was created
 * @apiSuccess (200) {Number} updated_at Timestamp of when habit was last updated
 * @apiSuccess (200) {Object[]} categories List of habit's categories
 *
 * @apiParamExample {json}
 *  {
 *    "name": "Call mom",
 *    "description": "Give her a call tonight",
 *    "created_by": 3
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *    "id": 9,
 *    "name": "Call mom",
 *    "description": "Give her a call tonight",
 *    "created_by": 3,
 *    "created_at": "2019-08-27 15:32:55",
 *    "updated_at": "2019-08-30 04:51:31",
 *    "categories": []
 *  }
 *
 * @apiError UserNotFound The Habit was not found.
 *
 * @apiErrorExample {json} Habit not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find habit."
 *  }
 *
 */
router.put('/:id', checkHabitId, async (req, res) => {
  const { id } = req.params;
  const existingHabit = Habits.findById(id);
  try {
    await Habits.update(id, { ...existingHabit, ...req.body }).then(newHabit =>
      res.status(201).json(newHabit)
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating habit' });
  }
});

/**
 *
 * @api {delete} /habits/:id Delete habit
 * @apiName DeleteHabit
 * @apiGroup Habits
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id Habit ID
 *
 * @apiSuccess (200) {String} message Success message
 * @apiSuccess (200) {Object} deleted_habit Deleted habit information
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "message": "Habit successfully deleted",
 *    "deleted_habit": {
 *      "id": 1,
 *      "name": "Swim laps",
 *      "description": "Good for heart health",
 *      "created_by": 1,
 *      "created_at": "2019-08-27 15:32:55",
 *      "updated_at": "2019-08-30 04:51:31",
 *      "categories": [
 *        {
 *          "id": 2,
 *          "name": "Health",
 *          "description": "Habits for health"
 *        },
 *        {
 *          . . .
 *        }
 *      ]
 *    }
 *  }
 *
 * @apiError UserNotFound The Habit was not found.
 *
 * @apiErrorExample {json} Habit not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find habit."
 *  }
 *
 */
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
