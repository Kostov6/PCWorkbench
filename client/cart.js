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
    let table = document.getElementsByTagName('tbody')[0];

    for (let item of data) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<th scope="row">
            <div class="p-2">
                <img src="${item.photo}" alt="" width="95" class="img-fluid rounded shadow-sm" />
                <div class="ml-3 d-inline-block align-middle">
                <h5 class="mb-0">
                    <a href="/" class="text-dark d-inline-block" id="redirect">${item.title}</a>
                </h5>
                <span class="text-muted font-weight-normal font-italic">Category: ${item.type}</span>
                </div>
            </div>
        </th>
        <td class="align-middle"><strong class="price">$${item.price}</strong></td>
        <td class="align-middle" style="width: 75px;">
            <input class="form-control" type="number" value="${item.quantity}" />
        </td>
        <td class="align-middle">
            <a class="text-dark ml-4 remove"><i class="fa fa-trash"></i></a>
        </td>`;

        console.log(tr.querySelector('#redirect'));
        tr.querySelector('#redirect').setAttribute('href', (item.type.toLowerCase().startsWith('pc') ? `/computer?id=${item.id}` : `/component?id=${item.id}`)); 

        tr.querySelector('.form-control').addEventListener('change', event => {
            console.log('change');
            fetch('http://localhost:3000/updateCart', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({id: item.id, quantity: parseInt(event.target.value)})
            }).then(() => {

                console.log(item.id);
                if (parseInt(event.target.value) <= 0) {
                    event.target.parentElement.parentElement.remove();
                }
                updatePrice();
            });
        });

        tr.querySelector(".remove").addEventListener('click', event => {
            fetch('http://localhost:3000/updateCart', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({id: item.id, quantity: 0})
            }).then(() => {

                console.log(item.id);
                event.target.parentElement.parentElement.parentElement.remove();
                updatePrice();
            });
        })

        table.appendChild(tr);
        subtotal += item.quantity * item.price;
    }

    document.getElementById('build').addEventListener('change', event => {
        if (event.target.checked) {
            console.log('test');
            document.getElementById("built").style.display = "block";
            document.getElementById("total").innerText = "$" + (subtotal + 35).toFixed(2);
            document.getElementById('checkout').setAttribute('href', '/checkout?buildPC');
        } else {
            console.log('test1');
            document.getElementById("built").style.cssText = "display:none !important";
            document.getElementById("total").innerText = "$" + (subtotal + 10).toFixed(2);
            document.getElementById('checkout').setAttribute('href', '/checkout');
        }
    });

    if (document.getElementById('build').checked) {
        document.getElementById("built").style.display = "block";
        document.getElementById("total").innerText = "$" + (subtotal + 35).toFixed(2);

        document.getElementById('checkout').setAttribute('href', '/checkout?buildPC');
    } else {
        document.getElementById('total').innerText = "$" + (subtotal + 10).toFixed(2);
    }

    document.getElementById('subtotal').innerText = "$" + subtotal.toFixed(2);
})
.catch((err) => err.then(errData => {
    const errEl = document.getElementById("err");
    errEl.setAttribute("class", "activeErr");
    errEl.innerHTML = errData.message;

    console.log(errData)
}));

function updatePrice() {
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

        for (let item of data) {
            subtotal += item.quantity * item.price;
        }

        document.getElementById('subtotal').innerText = "$" + subtotal.toFixed(2);
        document.getElementById('total').innerText = "$" + (subtotal + 10).toFixed(2);

    })
    .catch((err) => err.then(errData => {
        const errEl = document.getElementById("err");
        errEl.setAttribute("class", "activeErr");
        errEl.innerHTML = errData.message;

        console.log(errData);
    }));
}