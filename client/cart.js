fetch(`http://localhost:3000/cartItems`, {
    method: "GET"
}).then(response => {
    console.log(response.ok);
    if (!response.ok)
        return Promise.reject(response.json());
    else
        return Promise.resolve(response.json());
})
.then(data => {
    let table = document.getElementsByTagName('tbody')[0];

    for (let item of data) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<th scope="row">
        <div class="p-2">
            <img src="${item.photo}" alt="" width="95" class="img-fluid rounded shadow-sm" />
            <div class="ml-3 d-inline-block align-middle">
            <h5 class="mb-0">
                <a href="#" class="text-dark d-inline-block">${item.title}</a>
            </h5>
            <span class="text-muted font-weight-normal font-italic">Category: ${item.type}</span>
            </div>
        </div>
        </th>
        <td class="align-middle"><strong>$${item.price}</strong></td>
        <td class="align-middle" style="width: 75px;">
        <input class="form-control" type="number" value="${item.quantity}" />
        </td>
        <td class="align-middle">
        <a href="#${item.id}" class="text-dark ml-4"><i class="fa fa-trash"></i></a>
        </td>`;
        table.appendChild(tr);
    }
})
.catch((err) => err.then(errData => {
    const errEl = document.getElementById("err");
    errEl.setAttribute("class", "activeErr");
    errEl.innerHTML = errData.message;

    console.log(errData)
}));

function change(event) {
    if (event.checked) {
        document.getElementById("built").style.display = "block";
        document.getElementById("total").innerText = "$3133.98";
    } else {
        document.getElementById("built").style.cssText =
        "display:none !important";
        document.getElementById("total").innerText = "$3108.98";
    }
}