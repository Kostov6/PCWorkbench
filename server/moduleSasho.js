const {
    makeQuery
} = require("./database");
const passwordHash = require('password-hash');

function info(req, res) {
    return res.status(200).send({
        login: req.session.logged,
        username: req.session.username,
        name: req.session.name,
        country: req.session.country,
        address: req.session.address,
        photo: req.session.photo,
        cart: req.session.cartItems
    });
};


function login(req, res) {
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
            // req.session.cartItems = JSON.parse(obj.cart_items);
            console.log(req.session.username);
            return res.status(200).send({
                message: "Successful login!"
            });
        } else
            return res.status(400).send({
                message: "Wrong password!"
            });
    });
}

function register(req, res) {
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
}

function edit(req, res) {
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
}


module.exports = [{
    method: "GET",
    path: '/info',
    endpointFunction: info
}, {
    method: "POST",
    path: '/login',
    endpointFunction: login
}, {
    method: "POST",
    path: '/register',
    endpointFunction: register
}, {
    method: "POST",
    path: '/edit',
    endpointFunction: edit
}]