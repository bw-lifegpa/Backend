exports.up = function(knex) {
  return knex.schema.createTable('habits_for_user', tbl => {
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
    tbl.integer('weighting').defaultTo(0);
    tbl.string('theme_color');
    tbl.datetime('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('habits_for_user');
};
