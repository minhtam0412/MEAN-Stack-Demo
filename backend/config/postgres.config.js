const env = process.env;
const config = {
  db: {
    host: env.POSTGRES_DB_HOST || 'localhost',
    port: env.POSTGRES_DB_PORT || '5432',
    user: env.POSTGRES_DB_USER || 'postgres',
    password: env.POSTGRES_DB_PASSWORD || '123456aqZ',
    database: env.POSTGRES_DB_NAME || 'unicorn',
  }, listPerPage: env.LIST_PER_PAGE || 50,
};

module.exports = config;
