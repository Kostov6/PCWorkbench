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

module.exports = [{
    method: "GET",
    path: '/getProduct',
    endpointFunction: getProduct
}, {
    method: "GET",
    path: '/getProductsByType',
    endpointFunction: getProductsByType
}]