function renderComp(id, id1) {
  document.getElementById(id).style.display = "none";
  document.getElementById(id1).style.backgroundColor = "skyblue";
  if (id == "search") {
    document.getElementById("playlist").style.display = "flex";
    document.getElementById("searchBtn").style.backgroundColor = "#eee";
  } else {
    document.getElementById("search").style.display = "flex";
    document.getElementById("playlistBtn").style.backgroundColor = "#eee";
  }
}

function showCard(data) {
  const x = `
          <div class="col-4">
              <div class="card">
                  <div class="card-body">
                      <h1 class="card-title">${data?.Title}</h5>
                      <h2 class="card-subtitle mb-2 text-muted">${
                        data?.Actors
                      }</h6>

                      <div>Director: ${data?.Director}</div>
                      <div>Language: ${data?.Language}</div>
                      <div>Runtime: ${data?.Runtime}</div>
                      <div>Type: ${data?.Type}</div>
                      <div>Writer: ${data?.Writer}</div>
                      <div>Year: ${data?.Year}</div>
                      <div>Imdb Rating: ${data?.imdbRating}</div>  
                      <rr>
                      <div>
                        helo
                      </div>
                  </div>
                  <div>
                    ${
                      data?.Poster
                        ? `<img src= ${data?.Poster} height="300px" />`
                        : ""
                    }
                  </div>
              </div>
          </div>
      `;

  document.getElementById("cardMovie").innerHTML = x;
}

function getdata(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showCard(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function searchFun() {
  var x = document.getElementById("title").value;

  url = "https://movieassignment-production.up.railway.app/search?title=" + x;

  console.log(x, url);
  getdata(url);
}

function authRoute(key) {
  if (key === "login") {
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("containerLogin").style.display = "block";
  } else {
    document.getElementById("containerLogin").style.display = "none";
    document.getElementById("signup-container").style.display = "block";
  }
}

function signUpFun() {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const data = {
    username: username,
    email: email,
    password: password,
  };

  console.log(data);

  authRoute("login");
}

function loginFun() {
  document.getElementById("auth").style.display = "none";
  document.getElementById("container").style.display = "block";
}
