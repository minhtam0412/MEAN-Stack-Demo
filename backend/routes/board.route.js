const BoardCtrl = require('../controllers/board.controller');
const authJwt = require('../middleware/auth.middleware');
module.exports = (app) => {
  app.get('/api/test/all', [authJwt.verifyToken, authJwt.isAdmin], BoardCtrl.allAccess);
  app.get('/api/test/user', BoardCtrl.userBoard);
  app.get('/api/test/mod', BoardCtrl.moderatorBoard);
  app.get('/api/test/admin', BoardCtrl.adminBoard);
}
