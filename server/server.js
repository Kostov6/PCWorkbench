const express = require('express');
const publicDir = `${__dirname}/..`;

const app = express();
const port = 3000;

const mysql = require('mysql');
const { resolve } = require('path');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pc_workbench'
})

app.use(express.static(publicDir));

app.get('/getPc/:id', (req, res) => {
  let id = req.params['id'];

  makeQuery('SELECT * FROM products WHERE id = ? AND type = "pc"', id).then((rows) => {

    let obj = rows[0];
    obj.specifications_details = JSON.parse(obj.specifications_details);
    obj.specifications_overview = JSON.parse(obj.specifications_overview);

    res.send(obj);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function makeQuery(query, ...args) {
  return new Promise((resolve, reject) => {
    connection.connect();
    connection.query(query, args, function (err, rows) {
      if (err) reject(err);
      
      resolve(rows);
    }); 

    connection.end();
  });
}