const Categories = require('./categoriesModel');

async function checkValidCategory(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description)
    res
      .status(400)
      .json({ message: 'Send a name and description in request body' });
  else next();
}

async function checkCategoryExists(req, res, next) {
  const { name } = req.body;
  try {
    const categoryInDb = await Categories.findByName(name);
    if (categoryInDb && categoryInDb.name.toLowerCase() === name.toLowerCase())
      res.status(400).json({ message: 'Category by that name already exists' });
    else next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error accessing categories' });
  }
}

async function checkCategoryId(req, res, next) {
  const { id } = req.params;
  try {
    const categoryInDb = await Categories.findById(id);
    if (!categoryInDb)
      res.status(400).json({ message: `Category {id: ${id}} does not exist` });
    else next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error accessing categories' });
  }
}

module.exports = {
  checkValidCategory,
  checkCategoryExists,
  checkCategoryId
};
