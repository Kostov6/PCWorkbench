const express = require('express');
const passwordHash = require('password-hash');
const session = require('express-session');
const publicDir = `${__dirname}/..`;
const path = require('path')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

const mysql = require('mysql');
const { get } = require('https');
const { resolve } = require('path');
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
    '/not-found': getPage('not-found.html'),
    '/checkout': getPage('checkout.html')
  }
}

app.use(bodyParser.json());

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
    photo: req.session.photo
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

function getCartItems(req) {
  return makeQuery('SELECT cart_items FROM user WHERE username = ?', req.session.username).then(data => {
    if (data.length != 0) {
      data = JSON.parse(data[0]['cart_items']);
      console.log(data);
      let itemIds = data.map(obj => obj.id);
      
      if (itemIds.length != 0) {
        return makeQuery('SELECT id, title, type, price, photo FROM products WHERE id IN (?)', itemIds).then(rows => {
        
          for (let obj in rows) {
            rows[obj].quantity = data[obj].quantity;
          }
          
          return rows;
        })
      } else {
        return [];
      }
    } else {
      return [];
    }
  }) 
}

app.get('/cartItems', (req, res) => {
  getCartItems(req).then(data => res.send(data));
});

app.post('/addToCart', (req, res) => { //TODO Test this and others with wrong parameters
  makeQuery('SELECT cart_items FROM user WHERE username = ?', req.session.username).then(data => {
    if (data.length != 0) {
      let updates = req.body;
      data = JSON.parse(data[0]['cart_items']);
      let added = updates.map(() => false);

      
      for (let update in updates) {
        if (updates[update].quantity <= 0) {
          added[update] = true;
          continue;
        }

        for (let index in data) {
          if (data[index].id == updates[update].id) {
            data[index].quantity += updates[update].quantity;
            added[update] = true;
            continue;
          }
        }
      }

      for (let update in updates) {
        if (!added[update]) {
          data.push(updates[update]);
        }
      }

      res.send();
      makeQuery('UPDATE user SET cart_items = ? WHERE username = ?', JSON.stringify(data), req.session.username);
    } 

    res.send();
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

app.post('/updateCart', (req, res) => {
  makeQuery('SELECT cart_items FROM user WHERE username = ?', req.session.username).then(data => {
    if (data.length != 0) {
      let update = req.body;
      data = JSON.parse(data[0]['cart_items']);

      for (let index in data) {
        if (update.quantity <= 0 && data[index].id == update.id) {
          data.splice(index, 1);
        } else if (data[index].id == update.id) {
          data[index].quantity = update.quantity;
        }
      }

      res.send();
      makeQuery('UPDATE user SET cart_items = ? WHERE username = ?', JSON.stringify(data), req.session.username);
    } 

    res.send();
  });
});

app.get('/getAllComponents', (req, res) => {
    let brand = req.query.brand;

    makeQuery('SELECT * FROM products WHERE type != "PC"').then((rows) => {

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
