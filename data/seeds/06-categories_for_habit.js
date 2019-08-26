exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories_for_habit')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories_for_habit').insert([
        { habit_id: 1, category_id: 2 },
        { habit_id: 2, category_id: 1 },
        { habit_id: 2, category_id: 2 },
        { habit_id: 3, category_id: 1 },
        { habit_id: 3, category_id: 2 },
        { habit_id: 4, category_id: 2 },
        { habit_id: 5, category_id: 4 },
        { habit_id: 6, category_id: 5 },
        { habit_id: 7, category_id: 4 },
        { habit_id: 8, category_id: 2 },
        { habit_id: 8, category_id: 3 },
        { habit_id: 9, category_id: 2 },
        { habit_id: 10, category_id: 7 },
        { habit_id: 11, category_id: 6 }
      ]);
    });
};
