exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        {
          name: 'Exercise',
          description: 'Aerobic and strength training',
          created_by: 1
        },
        {
          name: 'Health',
          description: 'General habits for good health',
          created_by: 1
        },
        {
          name: 'Sleep',
          description: 'Sleep schedule and habits',
          created_by: 3
        },
        {
          name: 'Housekeeping',
          description: 'Maintaining a clean household',
          created_by: 3
        },
        {
          name: 'Family',
          description: 'Keeping healthy family relationships',
          created_by: 3
        },
        {
          name: 'Dating',
          description: 'Habits for maintaining a healthy dating life',
          created_by: 4
        },
        {
          name: 'School',
          description: 'Habits for academic success',
          created_by: 1
        }
      ]);
    });
};
