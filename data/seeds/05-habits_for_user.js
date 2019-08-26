exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('habits_for_user')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('habits_for_user').insert([
        { user_id: 1, habit_id: 1 },
        { user_id: 1, habit_id: 5 },
        { user_id: 2, habit_id: 4 },
        { user_id: 2, habit_id: 2 },
        { user_id: 2, habit_id: 1 },
        { user_id: 2, habit_id: 7 },
        { user_id: 3, habit_id: 3 },
        { user_id: 3, habit_id: 2 },
        { user_id: 4, habit_id: 5 },
        { user_id: 4, habit_id: 3 },
        { user_id: 4, habit_id: 1 }
      ]);
    });
};
