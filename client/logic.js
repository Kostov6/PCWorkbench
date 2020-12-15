var parts = 0;
var price = 0;
var wattage = 0;
var chosenComponents = new Array();

class component {
    constructor(name, type, wattage, price) {
        this.name = name;
        this.type = type;
        this.wattage = wattage;
        this.price = price;
    }
}

chosenComponents["cpu"] = "";
chosenComponents["gpu"] = "";
chosenComponents["HDD"] = "";
chosenComponents["fan"] = "";
chosenComponents["motherboard"] = "";
chosenComponents["ram"] = "";
chosenComponents["supply"] = "";
chosenComponents["chassis"] = "";

function update() {
    document.getElementById("parts").innerText = parts;
    document.getElementById("price").innerText = "$" + price;
    document.getElementById("wattage").innerText = wattage;
    validPowerSupplies();
}

function validPowerSupplies() {
    validNames = new Array();
    invalidNames = new Array();
    for (i = 0; i < allComponents.length; i++) {
        current = allComponents[i];
        if (current.type == "supply" && current.data2.split("W")[0] < wattage) {
            //invalid
            invalidNames.push(current.name);
        }
        if (current.type == "supply" && current.data2.split("W")[0] >= wattage) {
            //valid
            validNames.push(current.name);
        }
    }

    allNodeComponents = document.getElementById("components").children;
    for (i = 0; i < allNodeComponents.length; i++) {
        current = allNodeComponents[i];
        var name = current.querySelector("a[name='name']").innerText;

        if (invalidNames.includes(name)) {
            //invalidate
            current.children[5].children[0].classList.add("d-none");
            current.children[5].children[1].classList.remove("d-none");
        }
        if (validNames.includes(name)) {
            //validate
            current.children[5].children[0].classList.remove("d-none");
            current.children[5].children[1].classList.add("d-none");
        }
    }
}

function showErrorMsg(event) {
    // alert("ShowError");
    // console.log("ShowError");
}

function restoreContent(event) {
    //alert("RestoreContent v");
    // console.log("RestoreContent v");
}

function showErrorMsg() {}

function remove(event) {
    var id = event.target.id;
    id = id.substring(0, id.length - 1);
    document.getElementById(id).style.visibility = "visible";
    document.getElementById(id + "I").style.visibility = "hidden";
    if (document.getElementById("C" + id).checked) {
        document.getElementById(event.target.id).checked = false
    } else {
        parts--;
        price -= chosenComponents[id].price;
    }

    wattage -= chosenComponents[id].wattage;
    update();
    chosenComponents[id] = "";
}

function owned(event) {
    id = event.target.id.substr(1);
    console.log(document.getElementById(event.target.id).checked);
    if (document.getElementById(event.target.id).checked) {
        price -= chosenComponents[id].price;
        parts--;
        chosenComponents[id].owned = true;
    } else {
        price += chosenComponents[id].price;
        parts++;
        chosenComponents[id].owned = false;
    }

    update();
}