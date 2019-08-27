exports.up = function(knex) {
  return knex.schema
    .createTable('categories_for_habit', tbl => {
      tbl.increments();
      tbl
        .integer('habit_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('habits')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.timestamps(true, true);
    })
    .then();
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('categories_for_habit');
};
