const {
    makeQuery
} = require("./database");

const express = require('express');
const passwordHash = require('password-hash');
const publicDir = `${__dirname}/..`;

const app = express();
const port = 3000;

const {
    resolve
} = require('path');

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
        if (passwordHash.verify(password, obj.password_hash.replace(/'/g, '')))
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

app.get('/getProductsByBrand', (req, res) => {
    let brand = req.query.brand;

    makeQuery('SELECT * FROM products').then((rows) => {

        rows = rows.filter(obj => {
            obj.specifications_details = JSON.parse(obj.specifications_details);
            obj.specifications_overview = JSON.parse(obj.specifications_overview);

            console.log(obj.specifications_details.model);
            return obj.specifications_details.model.Brand == brand;
        })

        res.send(rows);
    });
})

app.get('/getAllComponents', (req, res) => {
    let brand = req.query.brand;

    makeQuery('SELECT * FROM products').then((rows) => {

        rows = rows.map(obj => {
            obj.specifications_details = JSON.parse(obj.specifications_details);
            obj.specifications_overview = JSON.parse(obj.specifications_overview);

            converted = {
                "name": obj.title,
                "type": obj.type,
                "wattage": 69,
                "price": obj.price,
                "data1": obj.specifications_details.model.Brand,
                "data2": obj.specifications_details.model.Brand,
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
            }


            console.log(converted);
            return converted;
        })

        res.send(rows);
    });
})

app.listen(port, () => {
    console.log(`Example app v2 listening at http://localhost:${port}`);
});