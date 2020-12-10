/*
var slider1 = document.getElementById("lowestPrice");
var output1 = document.getElementById("lowestPriceValue");
output1.innerHTML = "Lowest price: " + slider1.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider1.oninput = function () {
  if (slider2.value <= slider1.value) {
    slider2.value = slider1.value;
  }
  output1.innerHTML = "Lowest price: " + slider1.value;
};

var slider2 = document.getElementById("highestPrice");
var output2 = document.getElementById("highestPriceValue");
output2.innerHTML = "Highest price: " + slider2.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function () {
  if (slider1.value >= slider2.value) {
    slider1.value = slider2.value;
  }
  output2.innerHTML = "Highest price: " + slider2.value;
};

*/
var componentTypeFilter = "";
var allComponents = new Array();

function loadAllComponents() {
    allComponents = data;
}

function componentFilter(components) {
    var filteredOut = new Array();
    for (i = 0; i < components.length; i++) {
        if (
            components[i].type == componentTypeFilter ||
            componentTypeFilter == ""
        ) {
            filteredOut.push(components[i]);
        }
    }
    return filteredOut;
    ks;
}

function filter(components) {
    return components;
}

function addComponentToView(component) {
    allComponentsNode = document.getElementById("components");
    componentNode = document.createElement("div");
    componentNode.setAttribute("class", "element row border-top mx-2");

    imgWrap = document.createElement("div");
    imgWrap.setAttribute("class", "col-1 my-1");

    imageNode = document.createElement("img");
    imageNode.setAttribute("class", "image border");
    //imageNode.setAttribute("src",component.img);
    imageNode.setAttribute("src", component.img);
    imageNode.setAttribute("alt", "productImage");
    imgWrap.appendChild(imageNode);

    nameNode = document.createElement("a");
    nameNode.setAttribute("href", "/component");
    nameNode.setAttribute("style", "text-decoration: none;");
    nameNode.setAttribute("class", "name col-4 text-dark font-weight-bold align-self-center text-wrap");
    nameNode.setAttribute("name", "name");
    textNode = document.createTextNode(component.name);
    nameNode.appendChild(textNode);

    data1Node = document.createElement("div");
    data1Node.setAttribute("class", "data1 col-3 align-self-center text-wrap");
    textNode = document.createTextNode(component.data1);
    data1Node.appendChild(textNode);

    data2Node = document.createElement("div");
    data2Node.setAttribute("class", "data2 col-2 align-self-center text-wrap");
    textNode = document.createTextNode(component.data2);
    data2Node.appendChild(textNode);

    priceNode = document.createElement("div");
    priceNode.setAttribute("class", "price col-1 align-self-center text-wrap");
    textNode = document.createTextNode(component.price + "$");
    priceNode.appendChild(textNode);

    btnWrap = document.createElement("div");
    btnWrap.setAttribute("class", "col-1 align-self-center");

    buttonNode = document.createElement("button");
    buttonNode.setAttribute("class", "addButton btn btn-sm btn-outline-dark");
    buttonNode.setAttribute("onclick", "addComponent(event)");
    textNode = document.createTextNode("Add");
    buttonNode.appendChild(textNode);
    btnWrap.appendChild(buttonNode);


    notCNode = document.createElement("div");
    notCNode.setAttribute("class", "align-self-center text-danger d-none text-center");
    notCNode.setAttribute("style", "margin-left: -30px");
    textNode = document.createTextNode("Not compatible!");
    notCNode.appendChild(textNode);
    btnWrap.appendChild(notCNode);

    //componentNode.appendChild(imageNode);
    componentNode.appendChild(imgWrap);
    componentNode.appendChild(nameNode);
    componentNode.appendChild(data1Node);
    componentNode.appendChild(data2Node);
    componentNode.appendChild(priceNode);
    //  componentNode.appendChild(buttonNode);
    componentNode.appendChild(btnWrap);

    allComponentsNode.appendChild(componentNode);
}

function clearComponentView() {
    allComponentsNode = document.getElementById("components");
    while (allComponentsNode.firstChild) {
        allComponentsNode.removeChild(allComponentsNode.lastChild);
    }
}

function updateComponentView() {
    clearComponentView();
    var filteredOut;
    filteredOut = componentFilter(allComponents);
    filteredOut = filter(filteredOut);
    for (i = 0; i < filteredOut.length; i++) {
        addComponentToView(filteredOut[i]);
    }
    validPowerSupplies();
}

$(document).ready(function () {
    document.getElementById("showAll").addEventListener("click", (event) => {
        componentTypeFilter = "";
        updateComponentView();
    });

    document.getElementById("motherBoard").addEventListener("click", (event) => {
        componentTypeFilter = "motherBoard";
        console.log("motherBoard");
        updateComponentView();
    });

    document.getElementById("CPU").addEventListener("click", (event) => {
        componentTypeFilter = "CPU";
        console.log("CPU");
        updateComponentView();
    });

    document.getElementById("GPU").addEventListener("click", (event) => {
        componentTypeFilter = "GPU";
        console.log("GPU");
        updateComponentView();
    });

    document.getElementById("power").addEventListener("click", (event) => {
        componentTypeFilter = "power";
        console.log("power");
        updateComponentView();
    });

    document.getElementById("RAM").addEventListener("click", (event) => {
        componentTypeFilter = "RAM";
        console.log("RAM");
        updateComponentView();
    });

    document.getElementById("HDD").addEventListener("click", (event) => {
        componentTypeFilter = "HDD";
        console.log("HDD");
        updateComponentView();
    });

    document.getElementById("chassis").addEventListener("click", (event) => {
        componentTypeFilter = "chassis";
        console.log("chassis");
        updateComponentView();
    });

    document.getElementById("fan").addEventListener("click", (event) => {
        componentTypeFilter = "fan";
        console.log("fan");
        updateComponentView();
    });

    loadAllComponents();
    updateComponentView();
});

function addComponent(event) {
    var siblings = event.target.parentNode.parentNode.children;
    var compName;
    for (i = 0; i < siblings.length; i++) {
        if (siblings[i].getAttribute("class").includes("name")) {
            compName = siblings[i].innerText;
        }
    }

    for (i = 0; i < allComponents.length; i++) {
        if (allComponents[i].name == compName) {
            comp = allComponents[i];
            break;
        }
    }
    console.log(comp);
    document.getElementById(comp.type).style.visibility = "hidden";
    document.getElementById(comp.type + "I").style.visibility = "visible";
    document.getElementById(comp.type + "T").innerText = comp.name;
    if (chosenComponents[comp.type] != "" && !document.getElementById("C" + comp.type).checked) {
        price -= chosenComponents[comp.type].price;
        wattage -= chosenComponents[comp.type].wattage;
    } else if (document.getElementById("C" + comp.type).checked) {
        document.getElementById("C" + comp.type).checked = false;
        parts++;
    } else {
        parts++;
    }
    chosenComponents[comp.type] = comp;
    price += comp.price;
    wattage += comp.wattage;
    update();
}