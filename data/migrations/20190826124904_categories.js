exports.up = function(knex) {
  return knex.schema.createTable('categories', tbl => {
    tbl.increments();
    tbl
      .string('name', 128)
      .notNullable()
      .unique();
    tbl.string('description', 512);
    tbl
      .integer('created_by')
      .unsigned()
      // .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('categories');
};
