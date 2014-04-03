
module.exports = function(app) {

    var public = require('../src/back/public.js')(app);
    var auth   = require('../src/back/authentication.js')(app);

    // PUBLIC
    app.get('/', public.index);
    app.post('/api/register', public.register);

    //   AUTHENTICATION
    app.post('/api/auth/login', auth.login);

};