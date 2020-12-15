window.addEventListener('load', (event) => {
  let header = `
    <a class="navbar-brand" href="/">PC Workbench</a>
    <ul class="navbar-nav">
      <li class="nav-item  mx-2">
        <a class="nav-link" href="/" id="navhome">Home</a>
      </li>
      <li class="nav-item mx-2">
        <a class="nav-link" href="/pre-built" id="navpre-built">Prebuilt PCs</a>
      </li>
      <li class="nav-item mx-2">
        <a class="nav-link" href="/build-PC" id="navbuild-PC">Build PC</a>
      </li>
      <li class="nav-item mx-2">
        <a class="nav-link" href="/components" id="navcomponents">Components</a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto" id="navUser">
      
    </ul>`
  const nav = document.createElement("nav");
  nav.setAttribute("class", "navbar navbar-expand-md bg-dark navbar-dark sticky-top");
  nav.innerHTML = header;
  document.body.insertBefore(nav, document.body.firstChild);
  fetch(`http://localhost:3000/logged`, {
    method: "GET",
  })
    .then(response => {
      if (!response.ok)
        return Promise.reject();
      else
        return Promise.resolve(response.json());
    }).then((data) => {
      let ul = document.getElementById("navUser")
      if (data.message == "Logged!") {
        const add = `<li class="nav-item mx-2" id="bprofile.html">
        <a class="nav-link" href="/profile" id="navprofile"><i class="fas fa-user"></i> Profile</a>
      </li>
      <li class="nav-itme mx-2" id="blogout">
        <a class="nav-link" href="/" id="navlogout"><i class="fas fa-sign-out-alt fa-lg"></i></span> Sign Out</a>
      </li>
      <li class="nav-itme mx-2">
        <a class="nav-link" href="/cart" id="navcart"><i class="fas fa-shopping-cart"></i></span> Cart</a>
      </li>`;
        ul.innerHTML = add;
        document.getElementById("navlogout").addEventListener("click", function () {
          fetch(`http://localhost:3000/logout`, {
            method: "GET",
          })
            .then(response => {
              if (!response.ok)
                return Promise.reject(response.json());
              else return Promise.resolve();
            }).then(() => {
              window.location.replace("http://localhost:3000");
            }).catch((data) => {
              alert(data.message);
            })
        })
      } else {
        const add = `<li class="nav-item mx-2" id="bregister.html">
          <a class="nav-link" href="/register" id="navregister"><i class="fas fa-user"></i> Sign Up</a>
        </li>
        <li class="nav-itme mx-2" id="blogin.html">
          <a class="nav-link" href="/login" id="navlogin"><i class="fas fa-sign-in-alt fa-lg"></i></span> Sign In</a>
        </li>`;
        ul.innerHTML = add;
      }
    })
    .catch(() =>
      console.log("error!")
    );

  let path = window.location.pathname;
  path = path.split("?");
  let page = path[0].split("/").pop();
  if (page.length == 0) page = "home";
  page = "nav" + page;
  let pageButton = document.getElementById(page);
  if (pageButton) {
    pageButton.setAttribute("class", "nav-link active");
  }
})