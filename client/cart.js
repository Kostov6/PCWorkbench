fetch(`http://localhost:3000/info`, {
    method: "GET"
}).then(response => {
    console.log(response.ok);
    if (!response.ok)
        return Promise.reject(response.json());
    else
        return response.json();
})
.then(data => {
    window.location.href = "http://localhost:3000/login";
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