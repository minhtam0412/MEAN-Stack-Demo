const pgPromise = require('pg-promise');
const pgp = pgPromise({});
const pgConfig = require('../../config/postgres.db.config');
const db = pgp(pgConfig.db);

exports.db = db;
