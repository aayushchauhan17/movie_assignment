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
    authRoute("login");
  }

  function loginFun() {
    document.getElementById("auth").style.display = "none";
    document.getElementById("container").style.display = "block";
  }