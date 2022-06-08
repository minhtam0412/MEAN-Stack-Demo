module.exports = (app) => {
  const db = require('../postgres/user.postgres.queries');
  app.get('/api/postgres/users', db.getUsers)
  app.get('/api/postgres/users/:id', db.getUserById)
  app.post('/api/postgres/user', db.createUser);
  app.put('/api/postgres/users/:id', db.updateUser)
  app.delete('/api/postgres/users/:id', db.deleteUser)
}
