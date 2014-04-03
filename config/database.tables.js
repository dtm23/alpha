var tables = [
    'CREATE TABLE IF NOT EXISTS `account` (' +
        '`id` int(11) NOT NULL AUTO_INCREMENT,' +
        '`username` VARCHAR(255) NOT NULL,' +
        '`password` VARCHAR(100) NOT NULL,' +
        '`created_on` TIMESTAMP NOT NULL,' +
        'constraint pk_account primary key (id)' +
    ');',
    'TRUNCATE TABLE `account`;'
];


module.exports = function(app) {
    var db = app.get('DB:connection');

    db.getConnection(function(err, connection) {
        if (err) console.log(err);
        else {
            for (i = 0; i < tables.length; i++) {
                connection.query(tables[i], function (err) {
                    if (err) console.log(err);
                });
            }
        }
        connection.release();
    });
};
