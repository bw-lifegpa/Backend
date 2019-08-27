const db = require('../../data/dbConfig');

module.exports = {
  find,
  findByName,
  add,
  update,
  remove,
  findById,
  findHabitCategories,
  addCategoryToHabit
};

function find() {
  return db('habits');
}

function findByName(name) {
  return (
    db('habits')
      // .where({ name })
      .whereRaw(`LOWER(name) LIKE ?`, [`%${name}%`])
      .first()
  );
}

async function add(habit) {
  return await db('habits')
    .insert(habit, 'id')
    .then(([id]) => findById(id));
}

async function update(id, changes) {
  await db('habits')
    .where({ id })
    .update(changes);
  return findById(id);
}

async function remove(id) {
  const delUser = await findById(id);
  const del_ = await db('habits')
    .where({ id })
    .del();
  return del_ ? delUser : null;
}

async function findById(id) {
  return {
    ...(await db('habits')
      .where({ id })
      .first()),
    categories: await findHabitCategories(id)
  };
}

async function findHabitCategories(id) {
  return await db('categories_for_habit as ch')
    .where('habit_id', id)
    .join('categories as c', 'ch.category_id', 'c.id')
    .select('c.id', 'c.name', 'c.description');
}

async function addCategoryToHabit(habit_id, category_id) {
  const existingRecord = await db('categories_for_habit')
    .where({ habit_id })
    .andWhere({ category_id });
  if (existingRecord.length)
    return { message: 'Category already added for habit.' };
  else
    return {
      message: `Category {id: ${category_id}} added to habit successfully.`,
      habits: await db('categories_for_habit')
        .insert({ habit_id, category_id }, 'id')
        .then(() => findHabitCategories(habit_id))
    };
}
