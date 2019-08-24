const db = require('../../data/dbConfig');

module.exports = {
  find,
  findByUsername,
  add,
  update,
  remove,
  findById
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
    .insert(user)
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

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
