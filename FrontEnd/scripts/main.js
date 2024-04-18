// import
import { displayModal2, gererEditPage, logOut, removeImage } from "./edit.js";
// Initialisation des variables
//export let allProject = [];
const response = await fetch("http://localhost:5678/api/works");

//Récuperation des travaux
async function fetchWork() {
  if (response.ok) {
    // here we clone the response because we reused response.json()
    // on fetch categorie function
    let res = response.clone();
    // without return, we log the error to
    // response.json() return a promise
    return res.json();
  }
  throw new Error("Erreur lors de la récuperation des données");
}
// Traitements des data reçu
function dataGestion() {
  let token = window.sessionStorage.getItem("token");
  fetchWork().then((works) => {
    generateGalerie(works);
    editGalerie(works);
    //console.log(allProject);
    if (token === null) {
      allGalerie(works);
      filterObjets(works);
      filterAppartement(works);
      filterHotelAndRestaurant(works);
    }
    return works;
  });
}
// Appel des fonction

dataGestion();
generateMenu();
gererEditPage();
logOut();

// Creation des fonction

// Affichage dynamique des bouttons
function generateMenu() {
  const mesProjets = document.querySelector("#portfolioTitle");

  const divButton = document.createElement("div");
  divButton.setAttribute("class", "box-filters");

  const buttonAllProject = document.createElement("button");
  const buttonObject = document.createElement("button");
  const buttonAppart = document.createElement("button");
  const buttonHotelRestaurant = document.createElement("button");

  // Création du bouton tous
  buttonAllProject.innerText = "Tous";
  buttonAllProject.setAttribute("id", "btn-all");
  buttonAllProject.setAttribute("class", "btn-filters");
  // Création du bouton objets
  buttonObject.innerText = "Objets";
  buttonObject.setAttribute("id", "btn-obj");
  buttonObject.setAttribute("class", "btn-filters");
  // Création du bouton appartements
  buttonAppart.innerText = "Appartements";
  buttonAppart.setAttribute("id", "btn-appart");
  buttonAppart.setAttribute("class", "btn-filters");
  // Création du bouton hotel et restaurants
  buttonHotelRestaurant.innerText = "Hôtels & restaurants";
  buttonHotelRestaurant.setAttribute("id", "btn-hotel-restaurant");
  buttonHotelRestaurant.setAttribute("class", "btn-filters");

  mesProjets.after(divButton);
  divButton.appendChild(buttonAllProject);
  divButton.appendChild(buttonObject);
  divButton.appendChild(buttonAppart);
  divButton.appendChild(buttonHotelRestaurant);
}

// Affichage dynamique de la gallerie
function generateGalerie(works) {
  const gallery = document.querySelector(".gallery");
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
/**
 *
 * @param {*} works
 */
function allGalerie(works) {
  //console.log(token);
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

// Fetch all Categories
async function fetchCategorie() {
  // Attention l'autre constante response est une variable global
  const response = await fetch("http://localhost:5678/api/categories");
  if (response.ok) {
    // without return, we log the error to
    // response.json() return a promise that can be cousume only once
    return response.json();
  }
  throw new Error("Erreur lors de la récuperation des données");
}

// We need to fetch all categories for editing galerie
function editGalerie(works) {
  const titleModal = document.querySelector(".titleModal");
  const divGlobal = document.createElement("div");
  divGlobal.setAttribute("class", "globalImgContainer");
  titleModal.after(divGlobal);
  for (let i = 0; i < works.length; i++) {
    const divImg = document.createElement("div");
    divImg.setAttribute("class", "imgContainer");
    const divAnchor = document.createElement("div");
    divAnchor.setAttribute("class", "trashIcon");
    const anchor = document.createElement("a");
    anchor.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    const img = document.createElement("img");
    img.setAttribute("src", works[i].imageUrl);
    img.setAttribute("alt", works[i].title);
    // Set id for delete and put request
    img.setAttribute("id", works[i].id);
    img.setAttribute("class", "editImg");

    divGlobal.appendChild(divImg);
    divImg.appendChild(divAnchor);
    divAnchor.appendChild(anchor);
    divAnchor.appendChild(img);
    //complted
  }
  // creation de la separation
  const p = document.createElement("p");
  p.setAttribute("class", "p-separation");
  const separation = document.createElement("hr");
  separation.setAttribute("class", "separation");
  divGlobal.after(p);
  p.appendChild(separation);

  // creation du button pour ajouter une photo
  const addButton = document.createElement("button");
  addButton.setAttribute("id", "addBtn");
  addButton.innerHTML = "Ajouter une photo";
  p.after(addButton);

  //supprimer un projet (fonction importer de edit js)
  removeImage();
  editGalerieModal2();
  // Ouvrir la 2eme modal
  // impoted from edit js
  displayModal2(addButton);
}

function editGalerieModal2() {
  // construction de la 2ème modal
  const titleModal2 = document.querySelector(".titleModal2");
  // init formulaire
  const div = document.createElement("div");
  div.setAttribute("class", "formContainer");
  const divAddContainer = document.createElement("div");
  divAddContainer.setAttribute("class", "addContainer");
  const divIcon = document.createElement("div");
  divIcon.setAttribute("class", "divIcon");
  divIcon.innerHTML = `<i class="fa-regular fa-image"></i>`;
  const divAddPhoto = document.createElement("div");
  divAddPhoto.setAttribute("class", "photoContainer");
  //init form
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("class", "addPhoto");
  // init label
  const label = document.createElement("label");
  label.setAttribute("for", "file");
  label.innerText = " + Ajouter une photo";
  //init button
  const globalBtn = document.createElement("button");
  globalBtn.setAttribute("class", "globalBtn");
  //init p
  // init input type file
  const addImage = document.createElement("input");
  addImage.setAttribute("type", "file");
  addImage.setAttribute("id", "file");
  addImage.setAttribute("name", "file");
  addImage.setAttribute("accept", "image/*");
  //img tag for preview
  const imgPreview = document.createElement("img");
  imgPreview.setAttribute("id", "preview");
  // description
  const pTag = document.createElement("p");
  pTag.innerText = "jpg, png : 4mo max";

  addImage.addEventListener("change", () => {
    previewImage();
  });
  // add to DOM
  titleModal2.after(div);
  div.appendChild(form);
  form.appendChild(divAddContainer);
  divAddContainer.appendChild(divIcon);
  divAddContainer.appendChild(divAddPhoto);
  divAddPhoto.appendChild(label);
  divAddPhoto.appendChild(addImage);
  divAddPhoto.after(imgPreview);
  divAddContainer.appendChild(pTag);

  // Init Titre & Catégorie Inputs

  const labelTitle = document.createElement("label");
  labelTitle.setAttribute("for", "title");
  labelTitle.setAttribute("class", "labelTitle");
  labelTitle.innerText = "Titre";
  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("id", "title");
  inputTitle.setAttribute("name", "title");

  form.appendChild(labelTitle);
  form.appendChild(inputTitle);

  const labelCategorie = document.createElement("label");
  labelCategorie.setAttribute("for", "categorie");
  labelCategorie.setAttribute("class", "labelCategorie");
  labelCategorie.innerText = "Catégorie";

  const inputCategorie = document.createElement("select");
  inputCategorie.setAttribute("id", "categorie");
  inputCategorie.setAttribute("name", "categorie");

  form.appendChild(labelCategorie);
  form.appendChild(inputCategorie);

  // Generer les options dynamiquement grace au fetchCategorie
  fetchCategorie().then((category) => {
    console.log(category);
    for (let i = 0; i < category.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", `${category[i].name}`);
      option.innerText = `${category[i].name}`;
      option.setAttribute("id", `${category[i].id}`);
      inputCategorie.appendChild(option);
    }
  });

  const pModal2 = document.createElement("p");
  pModal2.setAttribute("class", "p-separation2");
  const separationModal2 = document.createElement("hr");
  separationModal2.setAttribute("class", "separation2");
  inputCategorie.after(pModal2);
  pModal2.appendChild(separationModal2);

  // creation du button de Validation
  const divValidation = document.createElement("div");
  divValidation.setAttribute("class", "validate");
  const validationButton = document.createElement("button");
  validationButton.setAttribute("id", "validateBtn");
  validationButton.innerHTML = "Valider";
  pModal2.after(divValidation);
  divValidation.appendChild(validationButton);

  //const formAction = document.querySelector(".addPhoto");

  addImageToBackend();
}

function previewImage() {
  const file = document.getElementById("file").files;
  if (file.length > 0) {
    let fileReader = new FileReader();
    fileReader.onload = (event) => {
      document
        .getElementById("preview")
        .setAttribute("src", event.target.result);
    };
    fileReader.readAsDataURL(file[0]);
    const photoContainer = document.querySelector(".photoContainer");
    photoContainer.style.backgroundColor = "#e8f1f6";
  }
}

function addImageToBackend() {
  const form = document.querySelector(".addPhoto");

  const jsCloseModal = document.querySelector(".modal");
  const jsCloseModal2 = document.querySelector(".modal2");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById("file");
    const title = document.getElementById("title").value;
    const category = document.getElementById("categorie");
    let categorieID = category.options[category.selectedIndex].id;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.error("Aucun fichier sélectionné.");
      return;
    }

    const image = fileInput.files[0];

    //console.log("Image:", file.name);
    console.log(category);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", categorieID);

    try {
      let token = window.sessionStorage.getItem("token");
      token = JSON.parse(token).token;
      console.log("Token:", token);

      const request = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await request.json();
      console.log("Réponse reçue:", responseData);
      jsCloseModal2.close();
      jsCloseModal.close();
      window.location.reload();

      if (!request.ok) {
        throw new Error("Erreur HTTP: " + request.status);
      }

      // Réinitialiser le formulaire après soumission réussie
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  });
}
