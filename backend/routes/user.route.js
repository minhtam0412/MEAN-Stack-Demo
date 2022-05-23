module.exports = (app) => {
  const Users = require('../controllers/user.controller');

  app.post('/user', Users.create);
  app.get('/user', Users.findAll);
  app.get('/user/:userId', Users.findOne);
  app.put('/user/:userId', Users.update);
  app.delete('/user/:userId', Users.delete);
};


