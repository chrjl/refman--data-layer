const fs = require('node:fs/promises');
const path = require('node:path');

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

dotenvExpand.expand(dotenv.config());

const jsonDir = process.env.JSONSTORAGE_COLLECTION_DIR;

/**
 * Read and parse all .json files from JSONSTORAGE_COLLECTION_DIR
 * Reshape flat objects to {...columns, details}, then insert into collections table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('items').del();
  await knex('keywords').del();

  // Parse all files in directory and run a transaction to insert into 'items' and 'keywords'
  const fileNames = await fs.readdir(jsonDir);

  const transactions = fileNames
    .filter((fileName) => path.extname(fileName) === '.json')
    .map(async (fileName) => {
      const filePath = path.join(jsonDir, fileName);
      const fileContent = await fs.readFile(filePath, 'utf-8');

      try {
        const fileData = JSON.parse(fileContent);

        const { title, url, keywords, ...details } = fileData;
        const item = {
          title,
          url,
          details,
        };

        await knex.transaction(async (trx) => {
          const id = await trx('items').returning('id').insert(item);
          await trx('keywords').insert(
            keywords.map((keyword) => ({
              item_id: id[0].id,
              keyword,
            }))
          );
        });

        return { success: true, name: fileName };
      } catch (e) {
        return { success: false, error: e, name: fileName };
      }
    });

  const status = await Promise.all(transactions);

  // Log filenames and whether they were successfully seeded (or encountered error)
  const success = status
    .filter((transaction) => transaction.success === true)
    .map((transaction) => transaction.name);
  const failure = status
    .filter((transaction) => transaction.success === false)
    .map((transaction) => transaction.name);

  console.log({ success, failure });
};
