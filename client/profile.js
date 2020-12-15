window.onload = function () {
    fetch(`http://localhost:3000/info`, {
        method: "GET"
    })
        .then(response => {
            console.log(response.ok);
            if (!response.ok)
                return Promise.reject(response.json());
            else {
                return Promise.resolve(response.json());
            }
        }).then((data) => {
            document.getElementById("name").innerHTML = data.name;
            document.getElementById("username").innerHTML = data.username;
            document.getElementById("country").innerHTML = data.country;
            document.getElementById("city").innerHTML = data.city;
            document.getElementById("address").innerHTML = data.address;
        })
        .catch((err) => err.then(errData => {
            window.location.href = "http://localhost:3000/";
        }));
};

document.getElementById("save").addEventListener("click", function () {
    const fname = document.getElementById("efname").value;
    const lname = document.getElementById("elname").value;
    const country = document.getElementById("ecountry").value;
    const city = document.getElementById("ecity").value;
    const street = document.getElementById("estreet").value;
    const password = document.getElementById("epassword").value;
    const password2 = document.getElementById("epassword2").value;
    const data = { fname: fname, lname: lname, country: country, city: city, address: street, password: password, password2: password2};
    fetch(`http://localhost:3000/edit`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok)
                return Promise.reject(response.json());
            location.reload();
        })
        .catch((err) => err.then(errData => {
            alert(errData.message)
        }));
});

