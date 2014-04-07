var crypto = require('crypto'),
    uuid = require('./helpers/uuid.js');

module.exports = function(app) {
    return {
        login: function(req, res){
            var db = app.get('DB:connection');

            db.getConnection(function(err, connection) {

                var shasum = crypto.createHash('sha1');
                shasum.update(req.body.password);
                var params = [req.body.username, shasum.digest('hex')];

                connection.query("SELECT * FROM `account` WHERE username = ? AND password = ? LIMIT 1", params, function(err, rows) {
                    if(rows.length === 0) {
                        connection.release();
                        res.send(400, { code: 100, message: "Username or password incorrect" });
                    } else {
                        var token = uuid.guid(),
                            expires = 2 * 60 * 60 * 1000; // ~ 2 hours
                        if(req.body.remember) expires = 365 * 24 * 60 * 60 * 1000; // ~ 1 year

                        connection.query("UPDATE `account` SET `token` = ? WHERE `id` = ?", [ token, rows[0].id ], function(err, rows) {
                            connection.release();
                            if(err) {
                                res.send(500, { code: 200, message: "Database error has occurred with code '" + err.code + " (" + err.errno + ")'" });
                            } else {
                                res.cookie('authentication', { username: req.body.username, token: token }, { maxAge: expires });
                                res.send(201);
                            }
                        });
                    }
                });
            });
        }
    };
};
