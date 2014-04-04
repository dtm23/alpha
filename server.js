// Dependencies
var express = require('express'),
    mysql = require('mysql'),
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

// Database Connection
app.set('DB:connection', mysql.createPool({
    //debug: ['ComQueryPacket', 'RowDataPacket'],
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'alpha'
}));

// Development
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    require('./config/database.tables.js')(app);
    require('./config/database.data.js')(app);
}

// Routes
require('./config/routes.js')(app);

// Start up the server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
