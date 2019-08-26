exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('habits')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('habits').insert([
        {
          name: 'Read for 30 minutes',
          description: 'Read for an least a half hour, fiction or non-fiction',
          created_by: 1
        },
        {
          name: 'Run 1 mile',
          description:
            'Running is heart healthy! Hit the pavement and try to hit a mile',
          created_by: 2
        },
        {
          name: 'Run 3 miles',
          description:
            'The more you run, the better the results! 3 miles is a good goal',
          created_by: 2
        },
        {
          name: 'Practice Yoga for 30 minutes',
          description: 'Get limber! Put out that mat and find your inner core',
          created_by: 1
        },
        {
          name: 'Water your plants',
          description: 'Your house plants are thirsty! Give them some lovin',
          created_by: 3
        },
        {
          name: 'Call parents',
          description:
            "C'mon, be nice to them. They're worried sick about you!",
          created_by: 3
        },
        {
          name: 'Sweep the house',
          description: "The floors aren't gonna clean themselves y'know",
          created_by: 3
        },
        {
          name: 'Get 8 hours of sleep',
          description:
            'Getting the right amount of sleep can set your day right!',
          created_by: 4
        },
        {
          name: 'Drink 1 gallon of water',
          description: 'Hydration is key!',
          created_by: 4
        },
        {
          name: 'Study data scructures',
          description: 'Keep your data structures and algorithm skills sharp',
          created_by: 2
        },
        {
          name: 'Dinner date',
          description: 'Talking to a cutie? Ask them out for a drink!',
          created_by: 4
        }
      ]);
    });
};
