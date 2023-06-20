const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

dotenvExpand.expand(dotenv.config());

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: process.env.SQLITE_DB_PATH,
    },
    migrations: {
      directory: './migrations/knex',
    },
    seeds: {
      directory: './seeds/knex',
    },
    useNullAsDefault: true,
  },
};
