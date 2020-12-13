constructFilter("RAM", [{
    filterID: "ram-8gb",
    filterName: "8GB"
}, {
    filterID: "ram-16gb",
    filterName: "16GB"
}, {
    filterID: "ram-32gb",
    filterName: "32GB"
}]);

constructFilter("Processor", [{
    filterID: "proc-intel-i3",
    filterName: "Intel i3"
}, {
    filterID: "proc-intel-i5",
    filterName: "Intel i5"
}, {
    filterID: "proc-intel-i7",
    filterName: "Intel i7"
}, {
    filterID: "proc-intel-i9",
    filterName: "Intel i9"
}, {
    filterID: "proc-amd-ryzen3",
    filterName: "AMD RYZEN 3"
}, {
    filterID: "proc-amd-ryzen5",
    filterName: "AMD RYZEN 5"
}, {
    filterID: "proc-amd-ryzen7",
    filterName: "AMD RYZEN 7"
}])

constructFilter("Graphics card", [{
    filterID: "gpu-nvidia-1000",
    filterName: "NVIDIA 1000 series"
}, {
    filterID: "gpu-nvidia-2000",
    filterName: "NVIDIA 2000 Series"
}, {
    filterID: "gpu-amd-radeon",
    filterName: "AMD RADEON"
}])

constructFilter("Hard disk", [{
    filterID: "hdd-hard",
    filterName: "HDD"
}, {
    filterID: "hdd-ssd",
    filterName: "SSD"
}])


const type = getParameterByName("type");
fetch(`http://localhost:3000/getAllComputers?type=pc-${type}`).then(res => res.json()).then(data => {
    console.log(data);
    for (dataObj of data) {
        createProductItem(dataObj);
    }
});


function constructFilter(filterTitle, filters) {
    const filterContainer = document.getElementById("filter-container")

    const titleEl = document.createElement("div");
    titleEl.setAttribute("class", "filter-text m-1 font-weight-bold");
    titleEl.innerHTML = filterTitle;

    filterContainer.appendChild(titleEl)

    for (filter of filters) {
        const filterEl = document.createElement("div");
        filterEl.setAttribute("class", "custom-control custom-checkbox");
        filterEl.innerHTML = `
                <input type="checkbox" id="${filter.filterID}" class="filter-input custom-control-input">
                <label for="${filter.filterID}" class="filter-label custom-control-label">${filter.filterName}</label>`;
        filterContainer.appendChild(filterEl);
    }

}


function createProductItem(productItem) {
    const productContainer = document.getElementById("product-container");

    const productEl = document.createElement("div");
    productEl.setAttribute("class", "col-lg-4 filter-item selected " + productItem.filters);
    productEl.innerHTML = getProductItem(productItem);

    productContainer.appendChild(productEl)
}

function getProductItem({
    id,
    image,
    title,
    price
}) {
    return `        <figure class="card card-product">
                        <a class="img-wrap border-bottom pb-3" href="./computer?id=${id}">
                            <img class="img-fluid" src="${image}">
                        </a>
                        <a class="m-3 text-dark h5" href="./computer?id=${id}" style="text-decoration: none;">${title}</a>
                        <div class="bottom-wrap mx-3 mb-3 mt-auto">
                            <div class="mt-2">
                                <a href="" class="btn btn-sm btn-dark float-right">Add to cart</a>
                                <div class="price-wrap h4">
                                    <span class="price-new">$${price}</span>
                                </div> <!-- price-wrap.// -->
                            </div>
                        </div> <!-- bottom-wrap.// -->
                    </figure>
                `;
}



function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}