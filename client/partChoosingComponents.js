var componentTypeFilter = "";
var allComponents = [];

function componentFilter(components) {
    return components.filter(item => {
        return item.type == componentTypeFilter || componentTypeFilter == ""
    })
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

function filterByPrice(components) {
    const minValue = document.getElementById("minPrice").value;
    const maxValue = document.getElementById("maxPrice").value;
    document.getElementById("minPriceView").innerHTML = minValue + '$';
    document.getElementById("maxPriceView").innerHTML = maxValue + '$';

    return components.filter(item => {
        return item.price >= minValue && item.price <= maxValue;
    });
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
    nameNode.setAttribute("href", "./component?id=" + component.id);
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
    textNode = document.createTextNode("$" + component.price);
    priceNode.appendChild(textNode);

    btnWrap = document.createElement("div");
    btnWrap.setAttribute("class", "col-1 align-self-center");

    buttonNode = document.createElement("button");
    buttonNode.setAttribute("class", "addButton btn btn-sm btn-outline-dark text-nowrap");
    buttonNode.setAttribute("style", "margin-left: -20px");
    textNode = document.createTextNode("Add to cart");
    buttonNode.appendChild(textNode);
    btnWrap.appendChild(buttonNode);

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
    filteredOut = filterByPrice(filteredOut);
    for (i = 0; i < filteredOut.length; i++) {
        addComponentToView(filteredOut[i]);
    }
}

$(document).ready(function () {

    fetch("http://localhost:3000/getAllComponents")
        .then(response => response.json())
        .then(dataReceived => {
            allComponents = dataReceived;
            updateComponentView();
        });
});


function uncheckAll(id) {
    $('input[type="checkbox"]').prop('checked', false);
    document.getElementById(id).checked = true;
}

function filterPrice() {
    updateComponentView();
}

function filterIt(event) {
    uncheckAll(event.target.id);
    if (event.target.id == "all") {
        componentTypeFilter = "";
        updateComponentView();
    } else if (event.target.id != componentTypeFilter) {
        componentTypeFilter = event.target.id;
        updateComponentView();
    } else {
        uncheckAll("all");
        componentTypeFilter = "";
        updateComponentView();
    }
}