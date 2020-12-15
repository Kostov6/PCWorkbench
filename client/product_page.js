function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const pcId = getParameterByName("id");
if (pcId !== null && pcId !== "") {
    fetch("http://localhost:3000/getProduct?id=" + pcId)
        .then(response => {
            console.log(response.ok);
            if (!response.ok)
                return Promise.reject(response.json());
            else
                return response.json();
        })
        .then(data => {
            const pcInfo = data;
            console.log(data);
            setElement("fullTitle", pcInfo.title);
            setElement("price", "$" + pcInfo.price);
            setElement("overview", pcInfo.description_long);
            //set image
            document.getElementById("pcImage").setAttribute("src", pcInfo.photo)
            //add specification overview
            const specificationsOverview = document.getElementById("specificationsOverview")
            for (overviewText of pcInfo.specifications_overview) {
                const overviewEl = document.createElement("li");
                overviewEl.innerHTML = overviewText;
                specificationsOverview.appendChild(overviewEl);
            }

            const spec = pcInfo.specifications_details;
            setElement("processor", spec.processor);
            setElement("chipset", spec.chipset);
            setElement("memory", spec.memory);
            setElement("hard_drives", spec.hard_drives);
            setElement("video_graphics", spec.video_graphics);
            setElement("power_supply", spec.power_supply);
            setElement("network_connectivity", spec.network_connectivity);
            setElement("chassis_fan", spec.chassis_fan);
            setElement("expansion_slots", spec.expansion_slots);
            setElement("ports", spec.ports);
            setElement("video_connectivity", spec.video_connectivity);

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