async function login() {
  const formLogin = document.querySelector(".form-login");
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = event.target.querySelector("[name=email]").value;
    const password = event.target.querySelector("[name=password]").value;
    const logData = {
      email: email,
      password: password,
    };
    // Conversion du json en string pour le body de la requete
    const chargeUtile = JSON.stringify(logData);
    // le controle des champs ici est temporaire
    if (email || password === "") {
      console.log("champ vide");
    } else {
      fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile,
      });
    }
  });
}

login();

// Faire une fonction de validation de l'email et une autre pour le mdp
// si l'une ET l'autre revoie true alors on fetch l'Api
