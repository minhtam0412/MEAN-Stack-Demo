module.exports = (app) => {
  const AuthCtrl = require('../controllers/auth.controller');

  app.post('/api/auth/register', AuthCtrl.register);
  app.post('/api/auth/login', AuthCtrl.login);
  app.post('/api/auth/refreshToken', AuthCtrl.refreshToken);
  app.post('/api/auth/logout', AuthCtrl.logout);
}
