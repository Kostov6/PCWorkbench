document.getElementById("register").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const pass2 = document.getElementById("pass2").value;
    fetch(`http://localhost:3000/register?username=${email}&password=${pass}&password2=${pass2}`, {
            method: "POST"
        })
        .then(response => {
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
});