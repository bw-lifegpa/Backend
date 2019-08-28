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
  removeHabitFromUser,
  getCompletedHabits,
  markHabitCompleted,
  getUserHabitCount,
  getHabitLastCompleted
};

function find() {
  return db('users').select(
    'id',
    'username',
    'first_name',
    'last_name',
    'email'
  );
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
      // 'hu.id',
      'hu.habit_id',
      'h.name',
      'h.description',
      'hu.weighting',
      'hu.theme_color',
      'hu.start_date',
      'hu.end_date'
    );
}

async function getUserHabitCount(id, habit_id) {
  if (habit_id) {
    return await db('completed_habits as c')
      .where('c.user_id', id)
      .andWhere('c.habit_id', habit_id)
      .join('habits as h', 'h.id', 'c.habit_id')
      .select('h.id as habit_id', 'h.name')
      .groupBy('h.id')
      .countDistinct('c.completed_at as count');
  } else {
    // return {
    //   ...(await db('completed_habits as c')
    //     .where('c.user_id', id)
    //     .join('habits as h', 'h.id', 'c.habit_id')
    //     .select('h.id as habit_name', 'h.name')
    //     .groupBy('h.id')
    //     .countDistinct('c.completed_at as count')),
    //   ...(await getHabitLastCompleted(id))
    // };
    return await db('completed_habits as c')
      .where('c.user_id', id)
      .join('habits as h', 'h.id', 'c.habit_id')
      .select('h.id as habit_id', 'h.name')
      .groupBy('h.id')
      .countDistinct('c.completed_at as count');
  }
}

async function getHabitLastCompleted(id, habit_id) {
  if (habit_id) {
    return await db('completed_habits')
      .where('user_id', id)
      .andWhere('habit_id', habit_id)
      .orderBy('completed_at', 'desc')
      .first();
  } else {
    console.log(
      db('completed_habits as c1')
        // .where('c1.user_id', id)
        .leftJoin('completed_habits as c2', function() {
          this.on('c1.habit_id', '=', 'c2.habit_id').on('c1.id', '<', 'c2.id');
        })
        .where('c2.id', null)
        .toString()
    );
    return await db('completed_habits as c1')
      // .where('c1.user_id', id)
      .leftJoin('completed_habits as c2', function() {
        this.on('c1.habit_id', '=', 'c2.habit_id').on('c1.id', '<', 'c2.id');
      })
      .where('c2.id', null);
  }
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

async function getCompletedHabits(user_id, habit_id) {
  if (!habit_id)
    return await db('completed_habits as c')
      .where('user_id', user_id)
      .join('habits as h', 'c.habit_id', 'h.id')
      .select('c.habit_id', 'h.name', 'c.completed_at');
  else {
    const userHasHabit = await db('habits_for_user')
      .where('user_id', user_id)
      .andWhere('habit_id', habit_id);
    if (!userHasHabit.length)
      return {
        message: 'User is not tracking habit.'
      };
    return await db('completed_habits as c')
      .where('user_id', user_id)
      .andWhere('habit_id', habit_id)
      .join('habits as h', 'c.habit_id', 'h.id')
      .select('c.completed_at');
  }
}

async function markHabitCompleted(user_id, habit_id, completed_at) {
  const userHasHabit = await db('habits_for_user')
    .where('user_id', user_id)
    .andWhere('habit_id', habit_id);
  if (!userHasHabit.length)
    return {
      message:
        'User is not tracking habit. Add habit to user first before marking as complete'
    };
  else if (completed_at)
    return {
      message: `Habit {id: ${habit_id}} marked complete.`,
      record: await db('completed_habits')
        .insert({ user_id, habit_id, completed_at }, 'id')
        .then(() => getCompletedHabits(user_id, habit_id))
    };
  else
    return {
      message: `Habit {id: ${habit_id}} marked complete.`,
      record: await db('completed_habits')
        .insert({ user_id, habit_id }, 'id')
        .then(() => getCompletedHabits(user_id, habit_id))
    };
}
