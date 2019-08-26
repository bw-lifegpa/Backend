const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'chelsea',
          first_name: 'Chelsea',
          last_name: 'Machen',
          password: bcrypt.hashSync('gigolo', 10),
          email: 'chelsea.machen@gmail.com'
        },
        {
          username: 'austen',
          first_name: 'Austen',
          last_name: 'Allred',
          password: bcrypt.hashSync('gigolo', 10),
          email: 'austen@lambda.com'
        },
        {
          username: 'jeremiah',
          first_name: 'Jeremiah',
          last_name: 'Tenbrink',
          password: bcrypt.hashSync('gigolo', 10),
          email: 'jeremiah@gmail.com'
        },
        {
          username: 'fox_mulder',
          first_name: 'Fox',
          last_name: 'Mulder',
          password: bcrypt.hashSync('gigolo', 10),
          email: 'fmulder@fbi.gov'
        }
      ]);
    });
};
