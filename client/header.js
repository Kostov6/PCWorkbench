window.addEventListener('load', (event) => {
  let header = `
    <a class="navbar-brand" href="/">PC Workbench</a>
    <ul class="navbar-nav">
      <li class="nav-item  mx-2">
        <a class="nav-link" href="/" id="home">Home</a>
      </li>
      <li class="nav-item mx-2">
        <a class="nav-link" href="/pre-built" id="pre-built">Prebuilt PCs</a>
      </li>
      <li class="nav-item mx-2">
        <a class="nav-link" href="/build-PC" id="build-PC">Build PC</a>
      </li>
      <li class="nav-item mx-2">
        <a class="nav-link" href="/components" id="components">Components</a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item mx-2" id="bprofile.html">
        <a class="nav-link" href="/profile" id="profile"><i class="fas fa-user"></i> Profile</a>
      </li>
      <li class="nav-itme mx-2" id="blogout">
        <a class="nav-link" href="/" id="logout"><i class="fas fa-sign-out-alt fa-lg"></i></span> Sign Out</a>
      </li>
      <li class="nav-item mx-2" id="bregister.html">
        <a class="nav-link" href="/register" id="register"><i class="fas fa-user"></i> Sign Up</a>
      </li>
      <li class="nav-itme mx-2" id="blogin.html">
        <a class="nav-link" href="/login" id="login"><i class="fas fa-sign-in-alt fa-lg"></i></span> Sign In</a>
      </li>
      <li class="nav-itme mx-2">
        <a class="nav-link" href="/cart" id="cart"><i class="fas fa-shopping-cart"></i></span> Cart</a>
      </li>
    </ul>`
  const nav = document.createElement("nav");
  nav.setAttribute("class", "navbar navbar-expand-md bg-dark navbar-dark sticky-top");
  nav.innerHTML = header;
  document.body.insertBefore(nav, document.body.firstChild);

  let path = window.location.pathname;
  path = path.split("?");
  let page = path[0].split("/").pop();
  if (page.length == 0) page = "home";
  let pageButton = document.getElementById(page);
  pageButton.setAttribute("class", "nav-link active");
  fetch(`http://localhost:3000/logged`, {
    method: "GET",
  })
    .then(response => {
      if (!response.ok)
        return Promise.reject();
      else 
        return Promise.resolve(response.json());
    }).then((data) => {
      if (data.message != "Logged!") {
        document.getElementById("bprofile.html").style.display = "none";
        document.getElementById("blogout").style.display = "none";
      } else {
        document.getElementById("bregister.html").style.display = "none";
        document.getElementById("blogin.html").style.display = "none";
      }
    })
    .catch (() => 
      console.log("error!")
    );
})