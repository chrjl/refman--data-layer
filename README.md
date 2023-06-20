---
tags:
  - SQLite
  - Node.js
  - Knex.js
---

# refman--data-layer

> **Note**
> [`refman` project wiki](https://github.com/chrjl/refman--docs/wiki)

## Required configuration (`.env`)

`SQLITE_DB_PATH`: required for `knexfile.js`

`JSONSTORAGE_COLLECTION_DIR`: required for seeding sqlite database

## SQLite migration: `knex` dev

Configured in `knexfile.js`

- sqlite "connection" filename: `$SQLITE_DB_PATH`
- migrations directory: `./migrations/knex`
- seeds directory: `./seeds/knex`

```console
$ knex migrate:latest
$ knex seed:run
```
