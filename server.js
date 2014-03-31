// Dependencies
var express = require('express'),
    http = require('http'),
    path = require('path');

// Set up the application
var app = express();

// Environment Checks
app.set('port', process.env.PORT || 1337);

// Manage Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Favicon
app.use(express.favicon());

// Express Configuration
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.compress());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'assets')));

// Development Logging
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Routes
require('./config/routes.js')(app);

// Start up the server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
