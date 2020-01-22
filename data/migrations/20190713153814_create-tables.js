exports.up = function (knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.text('username', 128)
        .unique()
        .notNullable();
    })
    .createTable('posts', tbl => {
      tbl.increments();
      tbl.text('contents');

      //This right here is needed to make our posts table able to access the IDs in the users table.
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        // These 4 lines are REQUIRED for foreign keys.
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('posts')
    .dropTableIfExists('users');
};
