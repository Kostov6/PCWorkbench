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

