const db = require('../../data/dbConfig');

module.exports = {
  find,
  findByUsername,
  add,
  update,
  remove,
  findById,
  findUserHabits,
  addHabitToUser,
  removeHabitFromUser
};

function find() {
  return db('users');
}

function findByUsername(username) {
  return db('users')
    .where({ username })
    .first();
}

async function add(user) {
  return await db('users')
    .insert(user, 'id')
    .then(([id]) => findById(id));
}

async function update(id, changes) {
  await db('users')
    .where({ id })
    .update(changes);
  return findById(id);
}

async function remove(id) {
  const delUser = await findById(id);
  const del_ = await db('users')
    .where({ id })
    .del();
  return del_ ? delUser : null;
}

async function findById(id) {
  return await db('users')
    .where({ id })
    .first();
}

async function findUserHabits(id) {
  return await db('habits_for_user as hu')
    .where('user_id', id)
    .join('habits as h', 'hu.habit_id', 'h.id')
    .select(
      'hu.id',
      'hu.habit_id',
      'h.name',
      'h.description',
      'hu.weighting',
      'hu.theme_color',
      'hu.created_at',
      'hu.updated_at'
    );
}

async function addHabitToUser(user_id, habit_id) {
  const existingRecord = await db('habits_for_user')
    .where({ user_id })
    .andWhere({ habit_id });
  if (existingRecord.length)
    return { message: 'Habit already added for user.' };
  else
    return {
      message: `Habit {id: ${habit_id}} added successfully.`,
      habits: await db('habits_for_user')
        .insert({ user_id, habit_id }, 'id')
        .then(() => findUserHabits(user_id))
    };
}

async function removeHabitFromUser(user_id, habit_id) {
  const del_ = await db('habits_for_user')
    .where({ user_id })
    .andWhere({ habit_id })
    .del();
  return Boolean(del_);
}
