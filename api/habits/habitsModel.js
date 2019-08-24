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
  return db('habits');
}

function findByName(name) {
  return db('habits')
    .where({ name })
    .first();
}

async function add(user) {
  return await db('habits')
    .insert(user)
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

function findById(id) {
  return db('habits')
    .where({ id })
    .first();
}
