document.getElementById("loginn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const data = { username: email, password: pass };
    fetch(`http://localhost:3000/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok)
                return Promise.reject(response.json());
        })
        .then(data => {
            window.location.href = "http://localhost:3000/profile";
        })
        .catch((err) => err.then(errData => {
            const errEl = document.getElementById("err");
            errEl.setAttribute("class", "activeErr");
            errEl.innerHTML = errData.message;

            console.log(errData)
        }));
});