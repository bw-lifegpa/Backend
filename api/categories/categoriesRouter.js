const express = require('express');
const router = express.Router();

const Categories = require('./categoriesModel');
const {
  checkValidCategory,
  checkCategoryExists,
  checkCategoryId
} = require('./categoriesMiddleware');

/**
 *
 * @api {get} /categories List all categories
 * @apiName GetCategories
 * @apiGroup Categories
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} categories Categories List
 * @apiSuccess (200) {Number} categories.id Category ID
 * @apiSuccess (200) {String} categories.name Category's name
 * @apiSuccess (200) {String} categories.description Category's description
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      "id": 1,
 *      "name": "Health",
 *      "description": "For your health!"
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
    const categories = await Categories.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get categories' });
  }
});

/**
 *
 * @api {get} /categories/:id Get category by ID
 * @apiName GetCategoryByID
 * @apiGroup Categories
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id Category ID
 *
 * @apiSuccess (200) {Number} id Category ID
 * @apiSuccess (200) {String} name Category's name
 * @apiSuccess (200) {String} description Category's description
 * @apiSuccess (200) {Number} created_by ID of user that created the category
 * @apiSuccess (200) {Number} created_at Timestamp of when category was created
 * @apiSuccess (200) {Number} updated_at Timestamp of when category was last updated
 * @apiSuccess (200) {Object[]} habits List of associated habits
 * @apiSuccess (200) {Number} habits.id Habit ID
 * @apiSuccess (200) {String} habits.name Name of habit
 * @apiSuccess (200) {String} habits.description Description of habit
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "name": "Health",
 *    "description": "For your health!",
 *    "created_by": 1,
 *    "created_at": "2019-08-27 15:32:55",
 *    "updated_at": "2019-08-30 04:51:31",
 *    "habits": [
 *      {
 *        "id": 2,
 *        "name": "Swim",
 *        "description": "Swim some laps"
 *      },
 *      {
 *        . . .
 *      }
 *    ]
 *  }
 *
 * @apiError UserNotFound The Category was not found.
 *
 * @apiErrorExample {json} Category not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find category."
 *  }
 *
 */
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

/**
 *
 * @api {get} /categories/c/:name Get category by name
 * @apiName GetCategoryByName
 * @apiGroup Categories
 * @apiVersion 1.0.0
 *
 * @apiParam {name} name Category Name
 *
 * @apiSuccess (200) {Number} id Category ID
 * @apiSuccess (200) {String} name Category's name
 * @apiSuccess (200) {String} description Category's description
 * @apiSuccess (200) {Number} created_by ID of user that created the category
 * @apiSuccess (200) {String} created_at Timestamp of when category was created
 * @apiSuccess (200) {String} updated_at Timestamp of when category was last updated
 * @apiSuccess (200) {Object[]} habits List of associated habits
 * @apiSuccess (200) {Number} habits.id Habit ID
 * @apiSuccess (200) {String} habits.name Name of habit
 * @apiSuccess (200) {String} habits.description Description of habit
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "name": "Health",
 *    "description": "For your health!",
 *    "created_by": 1,
 *    "created_at": "2019-08-27 15:32:55",
 *    "updated_at": "2019-08-30 04:51:31",
 *    "habits": [
 *      {
 *        "id": 2,
 *        "name": "Swim",
 *        "description": "Swim some laps"
 *      },
 *      {
 *        . . .
 *      }
 *    ]
 *  }
 *
 * @apiError UserNotFound The Category was not found.
 *
 * @apiErrorExample {json} Category not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find category."
 *  }
 *
 */
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

/**
 *
 * @api {get} /categories/:id/habits Get category's habits
 * @apiName GetCategoryHabits
 * @apiGroup Categories
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id Habit ID
 *
 * @apiSuccess (200) {Object[]} habits List of associated habits
 * @apiSuccess (200) {Number} habits.id Habit ID
 * @apiSuccess (200) {String} habits.name Name of habit
 * @apiSuccess (200) {String} habits.description Description of habit
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
router.get('/:id/habits', checkCategoryId, async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await Categories.findCategoryHabits(id));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get habits' });
  }
});

/**
 *
 * @api {post} /categories Add new category
 * @apiName AddNewCategory
 * @apiGroup Categories
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Category name
 * @apiParam {String} [description] Category description
 * @apiParam {Number} [created_by] User ID of category creator
 *
 * @apiSuccess (200) {Object} categories Newly created category
 * @apiSuccess (200) {Number} categories.id Category ID
 * @apiSuccess (200) {String} categories.name Name of category
 * @apiSuccess (200) {String} categories.description Description of category
 * @apiSuccess (200) {Number} categories.created_by User ID of category creator
 * @apiSuccess (200) {String} created_at Timestamp of when category was created
 * @apiSuccess (200) {String} updated_at Timestamp of when category was last updated
 * @apiSuccess (200) {Object[]} habits List of associated habits
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *    "name": "Health",
 *    "description": "Habits for health",
 *    "created_by": 3
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "id": 2,
 *      "name": "Health",
 *      "description": "Habits for health",
 *      "created_by": 3
 *      "created_at": "2019-08-27 15:32:55",
 *      "updated_at": "2019-08-30 04:51:31",
 *      "habits": []
 *    }
 *
 * @apiErrorExample {json} Missed required parameters
 *  HTTP/1.1 400
 *  {
 *    "message": "Missing name parameter"
 *  }
 *
 */
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

/**
 *
 * @api {put} /categories/:id Edit category
 * @apiName EditCategory
 * @apiGroup Categories
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Category ID
 *
 * @apiParam {String} [name] Category name
 * @apiParam {String} [description] Category description
 * @apiParam {Number} [created_by] User ID of category creator
 *
 * @apiSuccess (200) {Object} categories Newly edited category
 * @apiSuccess (200) {Number} categories.id Category ID
 * @apiSuccess (200) {String} categories.name Name of category
 * @apiSuccess (200) {String} categories.description Description of category
 * @apiSuccess (200) {String} created_at Timestamp of when category was created
 * @apiSuccess (200) {String} updated_at Timestamp of when category was last updated
 * @apiSuccess (200) {Object[]} habits List of associated habits
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "id": 2,
 *      "name": "Health",
 *      "description": "Habits for health",
 *      "created_at": "2019-08-27 15:32:55",
 *      "updated_at": "2019-08-30 04:51:31",
 *      "habits": []
 *    }
 *
 * @apiErrorExample {json} Missed required parameters
 *  HTTP/1.1 400
 *  {
 *    "message": "Missing required parameters"
 *  }
 *
 */
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

/**
 *
 * @api {delete} /categories/:id Delete category
 * @apiName DeleteCategory
 * @apiGroup Categories
 * @apiVersion 1.0.0
 *
 * @apiParam {id} id Category ID
 *
 * @apiSuccess (200) {String} message Success message
 * @apiSuccess (200) {Object} category Deleted category
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
 * "message": "Category successfully deleted.",
 * "deleted_category": {
 *   "id": 7,
 *   "name": "School",
 *   "description": "Habits for academic success",
 *   "created_by": 1,
 *   "created_at": "2019-08-27 19:15:30",
 *   "updated_at": "2019-08-27 19:15:30",
 *   "habits": [
 *     {
 *       "id": 10,
 *       "name": "Study data scructures",
 *       "description": "Keep your data structures and algorithm skills sharp"
 *     }
 *   ]
 * }
 *
 * @apiError UserNotFound The Category was not found.
 *
 * @apiErrorExample {json} Category not found
 *  HTTP/1.1 404
 *  {
 *    "message": "Could not find category."
 *  }
 *
 */
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
