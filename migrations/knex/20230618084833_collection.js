/**
 * Creates items and trash tables with same schema
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('items', collectionSchema)
    .createTable('trash', collectionSchema);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('items').dropTable('trash');
};

function collectionSchema(table) {
  table.increments('id').primary();
  table.string('title');
  table.string('url');
  table.json('details');
}

