exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('completed_habits')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('completed_habits').insert([
        { user_id: 1, habit_id: 1 },
        { user_id: 1, habit_id: 5 },
        { user_id: 1, habit_id: 5 },
        { user_id: 2, habit_id: 4 },
        { user_id: 2, habit_id: 2 },
        { user_id: 4, habit_id: 2 }
      ]);
    });
};
