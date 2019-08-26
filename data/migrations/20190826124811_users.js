exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl
      .string('username', 128)
      .notNullable()
      .unique();
    tbl.string('password', 64).notNullable();
    tbl.string('first_name', 128);
    tbl.string('last_name', 128);
    tbl.string('email', 256).unique();
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
