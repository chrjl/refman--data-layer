/**
 * Creates items and trash tables with same schema
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('items', (table) => {
      table.increments('key').primary();
      collectionSchema(table);
    })
    .createTable('trash', (table) => {
      table.integer('key').primary();
      collectionSchema(table);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('items').dropTable('trash');
};

function collectionSchema(table) {
  table.string('title');
  table.string('url');
  table.json('details');
}
