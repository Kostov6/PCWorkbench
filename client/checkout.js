fetch(`http://localhost:3000/cartItems`, {
    method: "GET"
}).then(response => {
    if (!response.ok)
        return Promise.reject(response.json());
    else
        return Promise.resolve(response.json());
})
.then(data => {
    let subtotal = 0;
    let quantity = 0;
    let table = document.getElementsByClassName('list-group')[0];

    for (let item of data) {
        let li = document.createElement('li');
        li.classList = "list-group-item d-flex justify-content-between lh-condensed";
        li.innerHTML = 
            `<div>
                <h6 class="my-0">${item.title}</h6>
                <small class="text-muted font-italic">Category: ${item.type}</small>
            </div>
            <div class="d-flex flex-column">
                <div class="text-muted">$${item.price}</div>
                <div class="align-self-end">x${item.quantity}</div>
            </div>`;

        table.insertBefore(li, document.getElementById('shipping'));
        subtotal += item.quantity * item.price;
        quantity += item.quantity;
    }

    document.getElementById('count').innerText = quantity;
    document.getElementById('total').innerText = "$" + (subtotal + 10).toFixed(2);

    let url_string = window.location.href;
    let url = new URL(url_string);
    let c = url.searchParams.has("buildPC");
    
    if (c) {
        let li = document.createElement('li');
        li.classList = "list-group-item d-flex justify-content-between lh-condensed";
        li.innerHTML = 
            `<div>
                <h6 class="my-0">Build PC</h6>
            </div>
            <div class="d-flex flex-column">
                <div class="text-muted">$25.00</div>
            </div>`;

        table.insertBefore(li, document.getElementById('shipping'));
        document.getElementById('total').innerText = "$" + (subtotal + 10 + 25).toFixed(2);
    }
})
.catch((err) => err.then(errData => {
    const errEl = document.getElementById("err");
    errEl.setAttribute("class", "activeErr");
    errEl.innerHTML = errData.message;

    console.log(errData)
}));