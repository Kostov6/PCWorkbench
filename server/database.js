const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pc_workbench'
});

module.exports = {
    makeQuery: function (query, ...args) {
        return new Promise((resolve, reject) => {
            connection.query(query, args, function (err, rows) {
                if (err) reject(err);

                resolve(rows);
            });
        });
    }
}