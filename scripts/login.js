function login() {
  const formLogin = document.querySelector(".form-login");
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    const logData = {
      email: event.target.querySelector("[name=email]").value,
      password: event.target.querySelector("[name=password]").value,
    };
    // Conversion au format JSON
    const chargeUtile = JSON.stringify(logData);
    //console.log(chargeUtile);
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });
  });
}

login();
