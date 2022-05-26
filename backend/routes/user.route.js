module.exports = (app) => {
  const userCtrl = require('../controllers/user.controller');
  const authJwt = require('../middleware/auth.middleware');

  app.post('/user', userCtrl.create);
  app.get('/user', userCtrl.findAll);
  app.get('/user/:userId', authJwt.verifyToken, userCtrl.findOne);
  app.put('/user/:userId', userCtrl.update);
  app.delete('/user/:userId', userCtrl.delete);
};


