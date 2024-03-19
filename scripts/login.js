// Les logs sont :
//email: sophie.bluel@test.tld
//password: S0phie

//Initialisation

// Création des fonctions
function login() {
  const formLogin = document.querySelector(".form-login");
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      let email = event.target.querySelector("[name=email]").value;
      verfierEmail(email);
      let password = event.target.querySelector("[name=password]").value;
      verifierPassword(password);
      // Set data to JSON
      let logData = {
        email: email,
        password: password,
      };
      // Conversion du json en string pour le body de la requete
      let chargeUtile = JSON.stringify(logData);
      afficherMessageErreur("");
      postLoginRequest(chargeUtile);
    } catch (erreur) {
      afficherMessageErreur(erreur.message);
    }
  });
}
// nb bien mettre le try catch dans l'eventListnner sinon bug

login();
// si l'une ET l'autre revoie true alors on fetch l'Api

// authorizer avant sur l'api ... Si la réponses est ok alors on redirige

function verfierEmail(email) {
  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+");
  if (!emailRegExp.test(email)) {
    throw new Error("L'email n'est pas valide");
  }
}

function verifierPassword(password) {
  if (password.length < 5) {
    throw new Error("Le mot de passe est trop court");
  }
}

function afficherMessageErreur(message) {
  let spanErreurMessage = document.getElementById("erreurMessage");
  if (!spanErreurMessage) {
    const form = document.querySelector(".form");
    spanErreurMessage = document.createElement("span");
    spanErreurMessage.id = "erreurMessage";
    form.append(spanErreurMessage);
  }
  spanErreurMessage.innerText = message;
}

async function postLoginRequest(chargeUtile) {
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