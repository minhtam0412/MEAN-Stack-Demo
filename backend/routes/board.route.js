const BoardCtrl = require('../controllers/board.controller');
const authJwt = require('../middleware/auth.middleware');

module.exports = (app) => {
  app.get('/api/test/all', BoardCtrl.allAccess);
  app.get('/api/test/user', [authJwt.verifyToken], BoardCtrl.userBoard);
  app.get('/api/test/mod', [authJwt.verifyToken, authJwt.isModerator], BoardCtrl.moderatorBoard);
  app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], BoardCtrl.adminBoard);
}
