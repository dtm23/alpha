var crypto = require('crypto');

module.exports = function(app) {
    return {
        index: function(req, res){
            res.render('index', { title: 'Project Alpha' });
        },

        register: function(req, res){
            var db = app.get('DB:connection');

            db.getConnection(function(err, connection) {

                var shasum = crypto.createHash('sha1');
                shasum.update(req.body.password);

                var params = {
                    username: req.body.username,
                    password: shasum.digest('hex'),
                    forename: req.body.forename,
                    surname: req.body.surname
                };
                connection.query("INSERT INTO `account` SET ?", params, function(err, result) {
                    connection.release();

                    if(err) {
                        res.send(500, { code: 200, message: "Database error has occurred with code '" + err.code + " (" + err.errno + ")'" });
                    } else {
                        res.header('Url', '/api/account/' + result.insertId);
                        res.send(201);
                    }
                });
            });
        }
    };
};
