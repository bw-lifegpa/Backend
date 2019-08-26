const Habits = require('./habitsModel');

async function checkValidHabit(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description)
    res
      .status(400)
      .json({ message: 'Send a name and description in request body' });
  else next();
}

async function checkHabitExists(req, res, next) {
  const { name } = req.body;
  try {
    const habitInDb = await Habits.findByName(name);
    if (habitInDb && habitInDb.name.toLowerCase() === name.toLowerCase())
      res.status(400).json({ message: 'Habit by that name already exists' });
    else next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error accessing habits' });
  }
}

async function checkHabitId(req, res, next) {
  const { id } = req.params;
  try {
    const habitInDb = await Habits.findById(id);
    if (!habitInDb)
      res.status(400).json({ message: `Habit {id: ${id}} does not exist` });
    else next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error accessing habits' });
  }
}

module.exports = {
  checkValidHabit,
  checkHabitExists,
  checkHabitId
};
