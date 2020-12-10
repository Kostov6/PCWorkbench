const express = require('express');
const passwordHash = require('password-hash');
const session = require('express-session');
const publicDir = `${__dirname}/..`;
const path = require('path')

const app = express();
const port = 3000;

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pc_workbench'
})

const routeMap = {
  GET: {
    '/': getPage('index.html'),
    '/component': getPage('component_page.html'),
    '/build-PC': getPage('build-PC.html'),
    '/cart': getPage('cart.html'),
    '/checkout': getPage('checkout.html'),
    '/components': getPage('components.html'),
    '/login': getPage('login.html'),
    '/pre-built': getPage('pre-built.html'),
    '/products': getPage('product-listing.html'),
    '/computer': getPage('product_page.html'),
    '/profile': getPage('profile.html'),
    '/register': getPage('register.html'),
    '/not-found': getPage('not-found.html')
  }
}

function getPage(pageName) {
  return path.resolve(publicDir + "/" + pageName);
}

app.use('/css', express.static(path.resolve(publicDir + '/css')));
app.use('/images', express.static(path.resolve(publicDir + '/images')));
app.use('/client', express.static(path.resolve(publicDir + '/client')));
app.use('/fontawesome-free-5.13.0-web', express.static(path.resolve(publicDir + '/fontawesome-free-5.13.0-web')));

app.get('/info', (req, res) => {
  return res.status(200).send({
    login: req.session.logged,
    username: req.session.username,
    name: req.session.name,
    country: req.session.country,
    address: req.session.address,
    photo: req.session.photo,
    cart: req.session.cartItems
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

app.post('/register', (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  let password2 = req.query.password2;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(username).toLowerCase()))
    return res.status(400).send({
      message: 'Email is not valid!'
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

app.post('/login', (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  makeQuery('SELECT * FROM user WHERE username = "?"', username).then((rows) => {
    let obj = rows[0];
    if (!obj)
      return res.status(400).send({
        message: `${username} is not registered!`
      });
    if (passwordHash.verify(password, obj.password_hash.replace(/'/g, ''))) {
      req.session.logged = true;
      req.session.username = obj.username;
      req.session.name = obj.name ? obj.name : "";
      req.session.country = obj.country ? obj.country : "";
      req.session.address = obj.address ? obj.address : "";
      req.session.photo = obj.photo ? obj.photo : "";
      req.session.cartItems = JSON.parse(obj.cart_items);
      console.log(req.session.username);
      return res.status(200).send({
        message: "Successful login!"
      });
    }
    else
      return res.status(400).send({
        message: "Wrong password!"
      });
  });
})

app.post('/edit', (req, res) => {
  let name = req.query.fname + " " + req.query.lname;
  let country = req.query.country;
  let city = req.query.country;
  let address = req.query.address;
  let password = req.query.password;
  let password2 = req.query.password2;
  if (req.session.name == name || !req.query.fname || !req.query.lname) {
    name = req.session.name;
  }
  if (req.session.country == country || !country) {
    country = req.session.country;
  }
  if (req.session.city == city || !city) {
    city = req.session.city;
  }
  if (req.session.address == address || !address) {
    address = req.session.address;
  }
  if (req.session.password == password || !country) {
    country = req.session.country;
  }
  if (req.session.country == country || !country) {
    country = req.session.country;
  }
})

app.get('/getAllComponents', (req, res) => {
    let brand = req.query.brand;

    makeQuery('SELECT * FROM products').then((rows) => {

        rows = rows.map(obj => {
            obj.specifications_details = JSON.parse(obj.specifications_details);
            obj.specifications_overview = JSON.parse(obj.specifications_overview);

            converted = {
                "id": obj.id,
                "name": obj.title,
                "type": obj.type,
                "wattage": 69,
                "price": obj.price,
                "data1": obj.specifications_details.model.Brand,
                "data2": obj.specifications_details.model.Brand,
                "brand": obj.specifications_details.model.Brand,
                "img": obj.photo
            }

            switch (obj.type) {
                case "cpu":
                    converted.data1 = obj.specifications_details.details["Operating Frequency"] + " GHz";
                    converted.data2 = "Cores: " + obj.specifications_details.details["# of Cores"] + " Threads: " + obj.specifications_details.details["# of Threads"];
                    break;
                case "gpu":
                    converted.data1 = obj.specifications_details.model["Model"];
                    converted.data2 = obj.specifications_details.details["Memory Size"] + " GB";
                    break;
                case "motherboard":
                    converted.data1 = obj.specifications_details.model["Model"];
                    converted.data2 = obj.specifications_details.details["Maximum Memory Supported"] + " MAX RAM";
                    break;
                case "ram":
                    converted.data1 = obj.specifications_details.details["Capacity"];
                    converted.data2 = obj.specifications_details.details["Speed"];
                    break;
            }


            console.log(converted);
            return converted;
        })

        res.send(rows);
    });
})

app.get('*', (req, res) => {
  let page = req.url.split('?')[0];

  if (Object.keys(routeMap.GET).includes(page)) {
    res.sendFile(routeMap.GET[page]);
    
  } else {
    res.sendFile(routeMap.GET['/not-found']);
  }
});

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
