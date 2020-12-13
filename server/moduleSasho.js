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
        city: req.session.city,
        address: req.session.address,
        photo: req.session.photo
    });
};


function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    makeQuery('SELECT * FROM user WHERE username = ?', username).then((rows) => {
        let obj = rows[0];
        if (!obj)
            return res.status(400).send({
                message: `${username} is not registered!`
            });
        if (passwordHash.verify(password, obj.password_hash.replace(/'/g, ''))) {
            req.session.logged = true;
            req.session.username = obj.username;
            req.session.name = obj.name ? obj.name : "";
            req.session.password = obj.password_hash.replace(/'/g, '');
            req.session.country = obj.country ? obj.country : "";
            req.session.city = obj.city ? obj.city : "";
            req.session.address = obj.address ? obj.address : "";
            req.session.photo = obj.photo ? obj.photo : "";
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
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;
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
    makeQuery('INSERT INTO `user` (`username`, `password_hash`,  `name` , `country` , `city` , `address`) VALUES (?, ?, ?, ?, ?, ?);', username, password, "", "", "", "").then(() => {

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
    let name = req.body.fname + " " + req.body.lname;
    let country = req.body.country;
    let city = req.body.city;
    let address = req.body.address;
    let password = req.body.password;
    let password2 = req.body.password2;
    if (req.session.name == name || req.body.fname == "" || req.body.lname == "") {
        name = req.session.name;
    } else if (name.length > 256) {
        return res.status(400).send({
            message: "Your name musn't be over 256 symbols!" 
        });
    }

    if (req.session.country == country || country == "") {
        country = req.session.country;
    } else if (country.length > 256) {
        return res.status(400).send({
            message: "Your country musn't be over 256 symbols!" 
        });
    }

    if (req.session.city == city || city == "") {
        city = req.session.city;
    } else if (city.length > 256) {
        return res.status(400).send({
            message: "Your city musn't be over 256 symbols!" 
        });
    }

    if (req.session.address == address || address == "") {
        address = req.session.address;
    } else if (address.length > 256) {
        return res.status(400).send({
            message: "Your address musn't be over 256 symbols!" 
        });
    }

    if (password != "" && password) {
        if (password.length < 6 || password.length > 32) {
            return res.status(400).send({
                message: 'Password must be between 6 and 32 symbols!'
            });
        }
        if (password != password2) {
            return res.status(400).send({
                message: "Passwords don't match!" 
            });
        }
        password = passwordHash.generate(password);
    } else {
        password = req.session.password;
    }
    makeQuery("Update `user` SET `name` = ?, `country` = ?, `city` = ?, `address` = ?, `password_hash` = ? WHERE `username` = ?;", name, country, city, address, password, req.session.username).then(() => {
        req.session.name = name;
        req.session.password = password;
        req.session.country = country;
        req.session.city = city;
        req.session.address = address;
        return res.status(200).send({
            message: 'Update successful!'
        });
    }).catch((e) => {
        return res.status(400).send({
            message: e
        });
    });
}

function logout(res, req) {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

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
}, {
    method: "GET",
    path: '/logout',
    endpointFunction: logout
}]