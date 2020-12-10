const {
    makeQuery
} = require("./database");

function getAllComponents(req, res) {
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
};

module.exports = [{
    method: "GET",
    path: '/getAllComponents',
    endpointFunction: getAllComponents
}]