// Dependencies
var express = require('express'),
    http = require('http'),
    path = require('path'),
    mysql = require('mysql'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    override = require('method-override'),
    cookie = require('cookie-parser'),
    session = require('express-session'),
    errorHandler = require('errorhandler');

// Set up the application
var app = express();

// Environment Checks
app.set('port', process.env.PORT || 1337);

// Manage Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express Configuration
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser());
app.use(compress());
app.use(override());
app.use(cookie());
app.use(session({ secret: 'cookie-secret', key: 'sid', cookie: { secure: true } }));
app.use(logger());

// Database Connection
app.set('DB:connection', mysql.createPool({
    //debug: ['ComQueryPacket', 'RowDataPacket'],
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'alpha'
}));

// Initialise the database
require('./config/database.tables.js')(app);

// Development (set NODE_ENV environment variable to trigger this)
if ('development' == app.get('env')) {
    app.use(errorHandler());
    require('./config/database.data.js')(app);
}

// Routes
require('./config/routes.js')(app);

// Start up the server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
