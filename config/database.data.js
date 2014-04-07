var data = [
    { query: 'TRUNCATE TABLE `account`;' },
    { query: 'INSERT INTO `account` SET ?', params: [
        { username: 'admin@domain.com', password: 'b1b3773a05c0ed0176787a4f1574ff0075f7521e' },
        { username: 'user@domain.com', password: 'b1b3773a05c0ed0176787a4f1574ff0075f7521e' }
    ]}
];

module.exports = function(app) {
    var db = app.get('DB:connection');

    db.getConnection(function(err, connection) {
        if (err) console.log(err);
        else {
            for (var i = 0; i < data.length; i++) {
                if(data[i].params instanceof Array) {
                    for(var j = 0; j < data[i].params.length; j++) {
                        connection.query(data[i].query, data[i].params[j], function (err) {
                            if (err) console.log(err);
                        });
                    }
                } else {
                    connection.query(data[i].query, data[i].params, function (err) {
                        if (err) console.log(err);
                    });
                }
            }
        }
        connection.release();
    });
};
