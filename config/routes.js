var public = require('../src/back/public.js');

module.exports = function(app) {
    app.get('/', public.index);
}