// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './storage/sqlite/collection.sqlite3',
    },
    migrations: {
      directory: './migrations/knex',
    },
    seeds: {
      directory: './seeds',
    },
    useNullAsDefault: true,
  },
};
