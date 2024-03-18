// Initialisation des variables
let allProject = [];
const response = await fetch("http://localhost:5678/api/works");

//Récuperation des travaux
async function fetchWork() {
  if (response.ok) {
    // without return, we log the error to
    // response.json() return a promise
    return response.json();
  }
  throw new Error("Erreur lors de la récuperation des données");
}
// Traitements des data reçu
fetchWork().then((works) => {
  generateGalerie(works);
  allGalerie(works);
  filterObjets(works);
  filterAppartement(works);
  filterHotelAndRestaurant(works);
});
// Appel des fonction

generateMenu();

// Creation des fonction

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

/// FILTRE ///

// Toutes la galerie
function allGalerie(works) {
  document.querySelector("#btn-all").addEventListener("click", () => {
    generateGalerie(works);
  });
}

// Filtre Objets
function filterObjets(works) {
  const btnObj = document.querySelector("#btn-obj");
  btnObj.addEventListener("click", () => {
    const objetsFilter = works.filter(
      (works) => works.category.name === "Objets"
    );
    // Au clique on efface la gallery
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    // ON parcours l'array filtrer et crée les nouveaux élements
    for (let i = 0; i < objetsFilter.length; i++) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      img.setAttribute("src", objetsFilter[i].imageUrl);
      img.setAttribute("alt", objetsFilter[i].title);
      figcaption.innerText = objetsFilter[i].title;

      gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(figcaption);
    }
  });
}

// Filtre appartements

function filterAppartement(works) {
  const buttonAppart = document.querySelector("#btn-appart");
  buttonAppart.addEventListener("click", () => {
    const appartFilter = works.filter(
      (works) => works.category.name === "Appartements"
    );
    // Au clique on efface la gallery
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    // ON parcours l'array filtrer et crée les nouveaux élements
    for (let i = 0; i < appartFilter.length; i++) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      img.setAttribute("src", appartFilter[i].imageUrl);
      img.setAttribute("alt", appartFilter[i].title);
      figcaption.innerText = appartFilter[i].title;

      gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(figcaption);
    }
  });
}

// Filtre Hotel & restaurants

function filterHotelAndRestaurant(works) {
  const buttonHotelRestaurant = document.querySelector("#btn-hotel-restaurant");
  buttonHotelRestaurant.addEventListener("click", () => {
    const hotelAndRestaurantFilter = works.filter(
      (works) => works.category.name === "Hotels & restaurants"
    );
    // Au clique on efface la gallery
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    // ON parcours l'array filtrer et crée les nouveaux élements
    for (let i = 0; i < hotelAndRestaurantFilter.length; i++) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      img.setAttribute("src", hotelAndRestaurantFilter[i].imageUrl);
      img.setAttribute("alt", hotelAndRestaurantFilter[i].title);
      figcaption.innerText = hotelAndRestaurantFilter[i].title;

      gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(figcaption);
    }
  });
}
