//Initialisation

// Création des fonctions
function login() {
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
    // .value sinon la condition est toujours true
    // le controle ne marche plus 19/03/24
    if (email.value || password.value === "") {
      console.log(email);
      console.log(password);
      console.log("champ vide");
    } else {
      async function postLoginRequest() {
        const loginRequestResponse = await fetch(
          "http://localhost:5678/api/users/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile,
          }
        );
        //console.log(loginRequestResponse);
        if (loginRequestResponse.ok) {
          document.location.href = "index.html";
        }
      }
      postLoginRequest();
    }
  });
}

login();

// Faire une fonction de validation de l'email et une autre pour le mdp
// si l'une ET l'autre revoie true alors on fetch l'Api

// Les logs sont :
//email: sophie.bluel@test.tld
//password: S0phie
// authorizer avant sur l'api ... Si la réponses est ok alors on redirige
