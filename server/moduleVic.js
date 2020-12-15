const {
    makeQuery
} = require("./database");

function getAllComponents(req, res) {
    let brand = req.query.brand;

    makeQuery('SELECT * FROM products WHERE type != "pc-home" AND type != "pc-office" AND type != "pc-gaming"').then((rows) => {

        rows = rows.map(obj => {
            obj.specifications_details = JSON.parse(obj.specifications_details);
            obj.specifications_overview = JSON.parse(obj.specifications_overview);

            converted = {
                "id": obj.id,
                "name": obj.title,
                "type": obj.type,
                "wattage": obj.wattage,
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
                    converted.data2 = obj.specifications_details.details["Memory Size"] + " GDDR5";
                    break;
                case "motherboard":
                    converted.data1 = obj.specifications_details.model["Model"];
                    converted.data2 = obj.specifications_details.details["Maximum Memory Supported"] + " MAX RAM";
                    break;
                case "ram":
                    converted.data1 = obj.specifications_details.details["Capacity"];
                    converted.data2 = obj.specifications_details.details["Speed"];
                    break;
                case "supply":
                    converted.data1 = obj.specifications_details.model.Brand;
                    converted.data2 = obj.wattage + "W";
                    converted.wattage = 0;
                    break;
                case "HDD":
                    converted.data1 = obj.specifications_details.model.Storage;
                    converted.data2 = obj.specifications_details.model.Type;
                    converted.wattage = 0;
                    break;
                case "chassis":
                    converted.data1 = obj.specifications_details.model.Dimensions;
                    converted.data2 = obj.specifications_details.model.Model;
                    converted.wattage = 0;
                    break;
                case "fan":
                    converted.data1 = obj.specifications_details.model.RPM;
                    converted.data2 = obj.specifications_details.model.Model;
                    converted.wattage = 0;
                    break;
            }


            console.log(converted);
            return converted;
        })

        res.send(rows);
    });
};

function getAllComputers(req, res) {
    const type = req.query.type;
    makeQuery('SELECT id,photo as image,title,price,filters FROM products WHERE type = ?', type).then((rows) => {

        res.send(rows);
    });
}

module.exports = [{
        method: "GET",
        path: '/getAllComponents',
        endpointFunction: getAllComponents
    },
    {
        method: "GET",
        path: '/getAllComputers',
        endpointFunction: getAllComputers
    }
]