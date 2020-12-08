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

app.get('/getProduct', (req, res) => {
  let id = req.query.id;

  makeQuery('SELECT * FROM products WHERE id = ?', id).then((rows) => {

    let obj = rows[0];
    obj.specifications_details = JSON.parse(obj.specifications_details);
    obj.specifications_overview = JSON.parse(obj.specifications_overview);

    res.send(obj);
  });
})

app.get('/getProductsByType', (req, res) => {
  let type = req.query.type;

  makeQuery('SELECT * FROM products WHERE type = ?', type).then((rows) => {

    for (let obj of rows) {
      obj.specifications_details = JSON.parse(obj.specifications_details);
      obj.specifications_overview = JSON.parse(obj.specifications_overview);
    }
    
    res.send(rows);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function makeQuery(query, ...args) {
  return new Promise((resolve, reject) => {
    connection.query(query, args, function (err, rows) {
      if (err) reject(err);
      
      resolve(rows);
    }); 
  });
}