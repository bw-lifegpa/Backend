const Users = require('./usersModel');

async function checkUserId(req, res, next) {
  const { id } = req.params;
  try {
    const userInDb = await Users.findById(id);
    if (!userInDb)
      res.status(400).json({ message: `User {id: ${id}} does not exist` });
    else next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error accessing users' });
  }
}

module.exports = { checkUserId };
