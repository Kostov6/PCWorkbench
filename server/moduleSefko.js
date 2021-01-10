const {
    makeQuery
} = require("./database");

function getProduct(req, res) {
    let id = req.query.id;

    makeQuery('SELECT * FROM products WHERE id = ?', id).then((rows) => {

        let obj = rows[0];
        obj.specifications_details = JSON.parse(obj.specifications_details);
        obj.specifications_overview = JSON.parse(obj.specifications_overview);

        res.send(obj);
    });
}

function getProductsByType(req, res) {
    let type = req.query.type;

    makeQuery('SELECT * FROM products WHERE type = ?', type).then((rows) => {

        for (let obj of rows) {
            obj.specifications_details = JSON.parse(obj.specifications_details);
            obj.specifications_overview = JSON.parse(obj.specifications_overview);
        }

        res.send(rows);
    });
}

function getCartItems(req) {
    return makeQuery('SELECT cart_items FROM user WHERE username = ?', req.session.username).then(data => {
      if (data.length != 0) {
        data = JSON.parse(data[0]['cart_items']);
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

function cartItems(req, res) {
    if (req.session.username == undefined) {
        res.send();
    }

    getCartItems(req).then(data => res.send(data));
};
  
function addToCart(req, res) { //TODO Test this and others with wrong parameters
    if (req.session.username == undefined) {
        res.send();
    }

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
}

function updateCart(req, res) {
    if (req.session.username == undefined) {
        res.send();
    }

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
}

module.exports = [{
    method: "GET",
    path: '/getProduct',
    endpointFunction: getProduct
}, {
    method: "GET",
    path: '/getProductsByType',
    endpointFunction: getProductsByType
}, {
    method: "GET",
    path: '/cartItems',
    endpointFunction: cartItems
}, {
    method: "POST",
    path: '/addToCart',
    endpointFunction: addToCart
}, {
    method: "POST",
    path: '/updateCart',
    endpointFunction: updateCart
}]