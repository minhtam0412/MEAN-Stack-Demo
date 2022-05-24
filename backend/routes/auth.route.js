module.exports = (app) => {
  const User = require('../controllers/auth.controller');

  app.post('/register', User.register);
  app.post('/login', User.login);
}
