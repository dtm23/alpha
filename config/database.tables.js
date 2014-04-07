var tables = [
    'CREATE TABLE IF NOT EXISTS `account` (' +
        '`id` int(11) NOT NULL AUTO_INCREMENT,' +
        '`username` VARCHAR(255) NOT NULL,' +
        '`password` VARCHAR(100) NOT NULL,' +
        '`forename` VARCHAR(100),' +
        '`surname` VARCHAR(100),' +
        '`token` VARCHAR(40),' +
        '`created_on` TIMESTAMP NOT NULL,' +
        'constraint uq_account_username unique (username),' +
        'constraint uq_account_token unique (token),' +
        'constraint pk_account primary key (id)' +
    ');'
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
