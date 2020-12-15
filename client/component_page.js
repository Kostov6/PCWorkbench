function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const partId = getParameterByName("id");
if (partId !== null && partId !== "") {
    fetch("http://localhost:3000/getProduct?id=" + partId)
        .then(response => {
            console.log(response.ok);
            if (!response.ok)
                return Promise.reject(response.json());
            else
                return response.json();
        })
        .then(data => {
            const partInfo = data;
            console.log(data);

            setElement("fullTitle", partInfo.title);
            setElement("price", "$" + partInfo.price);
            //set image
            document.getElementById("partImage").setAttribute("src", partInfo.photo)
            //add specification overview
            const specificationsOverview = document.getElementById("specificationsOverview")
            for (overviewText of partInfo.specifications_overview) {
                const overviewEl = document.createElement("li");
                overviewEl.innerHTML = overviewText;
                specificationsOverview.appendChild(overviewEl);
            }
            const model = partInfo.specifications_details.model;
            const details = partInfo.specifications_details.details;
            addRows("model", model);
            addRows("details", details);

            document.getElementById('add_to_cart').addEventListener('click', event => {
                event.preventDefault();
                fetch('http://localhost:3000/addToCart', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify([{id: partInfo.id, quantity: parseInt(document.getElementById('count').value)}])
                });
            });
        })
        .catch((err) => err.then(errData => {


            console.log(errData)
        }));

} else {
    //redirect to page not found
    window.location.href = "http://localhost:3000/not-found";
}

function setElement(elementId, data) {
    document.getElementById(elementId).innerHTML = data;
}

function addRows(elementName, dataObject) {
    const el = document.getElementById(elementName);
    for (const property in dataObject) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");

        const category = document.createElement("div");
        category.setAttribute("class", "col-3 pl-3 bg-light border-left border-top border-right p-2");
        category.innerHTML = property;

        const value = document.createElement("div");
        value.setAttribute("class", "col p-2 pl-3 border-top border-right");
        value.innerHTML = dataObject[property];

        row.appendChild(category);
        row.appendChild(value);

        el.appendChild(row);
    }
}