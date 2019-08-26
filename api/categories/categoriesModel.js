const db = require('../../data/dbConfig');

module.exports = {
  find,
  findByName,
  add,
  update,
  remove,
  findById,
  findCategoryHabits
};

function find() {
  return db('categories');
}

function findByName(name) {
  return (
    db('categories')
      // .where('name', name)
      .whereRaw(`LOWER(name) LIKE ?`, [`%${name}%`])
      .first()
  );
}

async function add(category) {
  return await db('categories')
    .insert(category)
    .then(([id]) => findById(id));
}

async function update(id, changes) {
  return await db('categories')
    .where({ id })
    .update(changes)
    .then(() => findById(id));
}

async function remove(id) {
  const delCategory = await findById(id);
  const del_ = await db('categories')
    .where({ id })
    .del();
  return del_ ? delCategory : null;
}

async function findById(id) {
  return {
    ...(await db('categories')
      .where({ id })
      .first()),
    habits: await findCategoryHabits(id)
  };
}

async function findCategoryHabits(id) {
  return await db('categories_for_habit as ch')
    .where('category_id', id)
    .join('habits as h', 'ch.habit_id', 'h.id')
    .select('h.id', 'h.name', 'h.description');
}
