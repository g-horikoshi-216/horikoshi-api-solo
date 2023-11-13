/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
  return knex.schema.hasTable('artists')
  .then(function (exists) {
    if(!exists) {
        return knex.schema.createTable('artists',
        function(table) {
            table.increments('id').primary();
            table.string('name',100);
            table.timestamps(false, true);
        });
    } else {
      return new Error("The table already exists");
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
  return knex.schema.hasTable('artists').then(function(exists) {
    if (exists) {
        return knex.schema.dropTable('artists');
    }
});
};
