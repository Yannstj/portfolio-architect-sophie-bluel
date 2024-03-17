// Initialisation des variables
let allProject = [];
const response = await fetch("http://localhost:5678/api/works");

//Récuperation des travaux
async function fetchWork() {
  if (response.ok) {
    // without return, we log the error to
    return response.json();
  }
  throw new Error("Erreur lors de la récuperation des données");
}
// Traitements des data reçu
fetchWork().then((works) => {
  generateGalerie(works);
  filterObjets(works);
});
// Appel des fonction

generateMenu();

// Creation des fonction

// Affichage dynamique de la gallerie
function generateGalerie(works) {
  const gallery = document.querySelector(".gallery");
  console.log(works);
  gallery.innerHTML = "";
  for (let i = 0; i < works.length; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.setAttribute("src", works[i].imageUrl);
    img.setAttribute("alt", works[i].title);
    figcaption.innerText = works[i].title;

    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
  }
}

// Affichage dynamique des bouttons
function generateMenu() {
  const mesProjets = document.querySelector("#portfolio h2");

  const divButton = document.createElement("div");
  const buttonAllProject = document.createElement("button");
  const buttonObject = document.createElement("button");
  const buttonAppart = document.createElement("button");
  const buttonHotelRestaurant = document.createElement("button");

  buttonAllProject.innerText = "Tous";
  buttonAllProject.setAttribute("id", "btn-all");

  buttonObject.innerText = "Objets";
  buttonObject.setAttribute("id", "btn-obj");

  buttonAppart.innerText = "Appartements";
  buttonAppart.setAttribute("id", "btn-appart");

  buttonHotelRestaurant.innerText = "Hôtels & restaurants";
  buttonHotelRestaurant.setAttribute("id", "btn-hotel-restaurant");

  mesProjets.appendChild(divButton);
  divButton.append(buttonAllProject);
  divButton.appendChild(buttonObject);
  divButton.appendChild(buttonAppart);
  divButton.appendChild(buttonHotelRestaurant);
}

function filterObjets(works) {
  const btnObj = document.querySelector("#btn-obj");
  btnObj.addEventListener("click", () => {
    const objetsFilter = works.filter(
      (works) => works.category.name === "Objets"
    );
    console.log(objetsFilter);
  });
}
