const db = require('../../data/dbConfig');

module.exports = {
  find,
  findByName,
  add,
  update,
  remove,
  findById
};

function find() {
  return db('categories');
}

function findByName(name) {
  return db('categories')
    .where({ name })
    .first();
}

async function add(user) {
  return await db('categories')
    .insert(user)
    .then(([id]) => findById(id));
}

async function update(id, changes) {
  await db('categories')
    .where({ id })
    .update(changes);
  return findById(id);
}

async function remove(id) {
  const delUser = await findById(id);
  const del_ = await db('categories')
    .where({ id })
    .del();
  return del_ ? delUser : null;
}

function findById(id) {
  return db('categories')
    .where({ id })
    .first();
}
