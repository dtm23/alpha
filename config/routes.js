var public = require('../src/back/public.js');
var auth   = require('../src/back/authentication.js');

module.exports = function(app) {
    //// WEB
    app.get('/', public.index);

    //// REST API
    //   AUTHENTICATION
    app.post('/api/auth/login', auth.login);
};