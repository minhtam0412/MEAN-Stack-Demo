module.exports = (app) => {
    const AuthCtrl = require('../controllers/auth.controller');

    app.post('/register', AuthCtrl.register);
    app.post('/login', AuthCtrl.login);
    app.post('/refreshToken', AuthCtrl.refreshToken);
}