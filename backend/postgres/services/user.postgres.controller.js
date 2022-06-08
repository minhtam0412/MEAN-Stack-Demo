const db = require('./db');
const helper = require('../helper');
const config = require('../../config/postgres.config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query('SELECT id, name, email FROM users OFFSET $1 LIMIT $2', [offset, config.listPerPage]);
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data, meta
  }
}

function validateCreate(user) {
  let messages = [];

  console.log(user);

  if (!user) {
    messages.push('No object is provided');
  }

  if (!user.name) {
    messages.push('Name is empty');
  }

  if (!user.email) {
    messages.push('Email is empty');
  }

  if (messages.length) {
    let error = new Error(messages.join(', '));
    error.statusCode = 400;

    throw error;
  }
}

async function create(user) {
  validateCreate(user);

  const result = await db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [user.name, user.email]);

  let message = 'Error in creating user';

  if (result.length) {
    message = `User created successfully with Id ${result[0].id}`;
  }

  return {message};
}


module.exports = {
  getMultiple, create
}
