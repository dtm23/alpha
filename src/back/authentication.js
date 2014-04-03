
module.exports = function(app) {
    return {
        login: function(req, res){
            var db = app.get('DB:connection');

            db.getConnection(function(err, connection) {

                var params = [req.body.username, req.body.password];
                connection.query("SELECT * FROM `account` WHERE username = ? AND password = ? LIMIT 1", params, function(err, rows) {
                    connection.release();

                    if(rows.length === 0) {
                        res.send(400, { code: 100, message: "Username or password incorrect" });
                    } else {
                        res.send(rows[0]);
                    }
                });
            });
        }
    };
};
