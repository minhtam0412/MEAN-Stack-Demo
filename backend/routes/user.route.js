module.exports = (app) => {
  const Users = require('../controllers/user.controller');

  app.post('/create', Users.create);
  app.get('/get-all', Users.findAll);
};
