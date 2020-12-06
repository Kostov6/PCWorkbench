const express = require('express');
const publicDir = `${__dirname}/..`;

const app = express();
const port = 3000;

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pc_workbench'
})

connection.connect();

connection.query('SELECT * FROM products', function (err, rows, fields) {
    if (err) throw err
  
    console.log('The solution is: ', rows[0].photo)
  })
  
connection.end();



app.use(express.static(publicDir));



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});