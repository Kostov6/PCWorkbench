<<<<<<< HEAD
const express = require('express');
const passwordHash = require('password-hash');
const publicDir = `${__dirname}/..`;
const path = require('path')

const app = express();
const port = 3000;

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pc_workbench'
})

const routeMap = {
    GET: {
        '/': (req, res) => {
            res.sendFile(path.resolve(publicDir + "/index.html"));
        },
        '/component': (req, res) => {
            res.sendFile(path.resolve(publicDir + "/component_page.html"));
        }
    }
}

app.use('/css', express.static(path.resolve(publicDir + '/css')));
app.use('/images', express.static(path.resolve(publicDir + '/images')));
app.use('/client', express.static(path.resolve(publicDir + '/client')));

app.get('*', (req, res) => {
    console.log(req.url);
})


app.post('/register', (req, res) => {
    let username = req.query.username;
    let password = req.query.password;
    let password2 = req.query.password2;
    if (username.length < 6 || username.length > 32)
        return res.status(400).send({
            message: 'Username must be between 6 and 32 symbols!'
        });
    if (password.length < 6 || password.length > 32)
        return res.status(400).send({
            message: 'Password must be between 6 and 32 symbols!'
        });
    if (password !== password2)
        return res.status(400).send({
            message: 'Both passwords must be the same!'
        });
    makeQuery('SELECT * FROM user WHERE username = "?"', username).then((rows) => {
        if (rows && rows.length)
            return res.status(400).send({
                message: 'Username is taken!'
            });
    });
    password = passwordHash.generate(password);
    makeQuery('INSERT INTO `user` (`username`, `password_hash`) VALUES ("?", "?");', username, password).then(() => {

        return res.status(200).send({
            message: 'Registration successful!'
        });
    }).catch((e) => {
        if (e.errno = 1062) {
            return res.status(400).send({
                message: "User already exists"
            });
        }

        console.log(e);

    });
})

app.post('/login', (req, res) => {
    let username = req.query.username;
    let password = req.query.password;
    makeQuery('SELECT * FROM user WHERE username = "?"', username).then((rows) => {
        let obj = rows[0];
        console.log(obj)
        if (!obj)
            return res.status(400).send({
                message: `No one named ${username} is registered!`
            });
        if (passwordHash.verify(password, obj.password_hash))
            return res.status(200).send({
                message: "Success!"
            });
        else
            return res.status(400).send({
                message: "Wrong password!"
            });
    });
})


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
=======
const express = require('express');
const passwordHash = require('password-hash');
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

app.post('/register', (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  let password2 = req.query.password2;
  if (username.length < 6 || username.length > 32)
    return res.status(400).send({
      message: 'Username must be between 6 and 32 symbols!'
    });
  if (password.length < 6 || password.length > 32)
    return res.status(400).send({
      message: 'Password must be between 6 and 32 symbols!'
    });
  if (password !== password2)
    return res.status(400).send({
      message: 'Both passwords must be the same!'
    });
  makeQuery('SELECT * FROM user WHERE username = "?"', username).then((rows) => {
    if (rows && rows.length)
      return res.status(400).send({
        message: 'Username is taken!'
      });
  });
  password = passwordHash.generate(password);
  makeQuery('INSERT INTO `user` (`username`, `password_hash`) VALUES ("?", "?");', username, password).then(() => {

    return res.status(200).send({
      message: 'Registration successful!'
    });
  }).catch((e) => {
    return res.status(400).send({
      message: e
    });
  });
})

app.get('/login', (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  makeQuery('SELECT * FROM user WHERE username = "?"', username).then((rows) => {
    let obj = rows[0];
    console.log(obj)
    if (!obj)
      return res.status(400).send({
        message: `No one named ${username} is registered!`
      });
    if (passwordHash.verify(password,obj.password_hash.replace(/'/g, '')))
      return res.status(200).send({
        message: "Successful login!"
      });
    else
      return res.status(400).send({
        message: "Wrong password!"
      });
  });
})


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
>>>>>>> 4537021154d5a1ff375ef97da3fd40cec667f931
}