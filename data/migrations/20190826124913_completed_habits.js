exports.up = function(knex) {
  return knex.schema.createTable('completed_habits', tbl => {
    tbl.increments();
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('habit_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('habits')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.timestamps(true, true);
    tbl.datetime('completed_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('completed_habits');
};
