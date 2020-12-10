document.getElementById("login").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    fetch(`http://localhost:3000/login?username=${email}&password=${pass}`, {
            method: "POST"
        })
        .then(response => {
            console.log(response.ok);
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