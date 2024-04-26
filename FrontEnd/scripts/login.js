//Initialisation

//Appel des fonctions
login();

// Création des fonctions
function login() {
  const formLogin = document.querySelector(".form-login");
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      let email = event.target.querySelector("[name=email]").value;
      //verfierEmail(email);
      let password = event.target.querySelector("[name=password]").value;
      //verifierPassword(password);
      verfierMailPwd(email, password);
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

async function postLoginRequest(chargeUtile) {
  try {
    const loginRequestResponse = await fetch(
      "http://localhost:5678/api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile,
      }
    );
    const tokenID = await loginRequestResponse.json();
    if (!loginRequestResponse.ok) {
      throw new Error("Identifiant ou mot de passe incorrect");
    }
    const valueToken = JSON.stringify(tokenID);
    if (loginRequestResponse.status === 200) {
      window.sessionStorage.setItem("token", valueToken);
      document.location.href = "index.html";
    }
  } catch (erreur) {
    afficherMessageErreur(erreur.message);
  }
}

function verfierMailPwd(email, password) {
  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+");
  if (email === "" && password === "") {
    throw new Error("Veuillez remplir les champs");
  }
  if (email === "") {
    throw new Error("Veuillez remplir le champ e-mail");
  } else if (!emailRegExp.test(email)) {
    throw new Error("e-mail invalide");
  }
  if (password === "") {
    throw new Error("Insérer un mot de passe");
  } else if (password.length < 5) {
    throw new Error("Le mot de passe est trop court");
  }
}

function gererErreurClient() {
  throw new Error("Identifiant ou mot de passe incorrect");
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

// switch va tester si la valeur passer en paramètre === la valeur de case
// on a donc ici res.status = x (number) === x (number)
//   switch (response.status) {
//     case 200:
//       //document.location.href = "index.html";
//       console.log(response);
//       break;
//     case 401:
//       console.log("erreur 401");
//       break;
//     case 404:
//       console.log("erreur 404");
//       break;
//     default:
//       console.log("erreur interne");
//   }
// }
