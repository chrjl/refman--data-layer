/**
 * Creates keywords table. keywords.item_id == items.id
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('keywords', (table) => {
    table.increments('_').primary();
    table.integer('item_id');
    table.string('keyword');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('keywords');
};
