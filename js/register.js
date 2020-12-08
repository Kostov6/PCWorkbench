document.getElementById("register").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const pass2 = document.getElementById("pass2").value;
    fetch(`http://localhost:3000/register?username=${email}&password=${pass}&password2=${pass2}`, {
            method: "POST"
        })
        .then(response => {
            if (!response.ok)
                return Promise.reject(response.json().message)
            return response.json();
        })
        .then(data => {
            console.log("Success");
        })
        .catch(err => console.log(err));
});