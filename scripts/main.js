let allProject = [];
//Récuperation des travaux
const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

allProject = works;

//console.log(allProject);

function generateGalerie(allProject) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  //console.log(works);
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
generateGalerie();

// function generateMenuCategorie () {
//   document.querySelector('')

// }

// async function fetchWork() {
//   const response = await fetch("http://localhost:5678/api/works");
//   if (response.ok) {
//     response.json();
//     console.log(response.json);
//   }
//   throw new Error("il y a une erreur de recuperation des données");
// }

// fetchWork().then((works) => {
//   generateGalerie(works);
// });

// function generateGalerie(works) {
//   console.log(works);
//   let divGallery = document.querySelector(".gallery");
//   divGallery.innerHTML = "";
//   for (let i = 0; i < works.length; i++) {
//     let figure = document.createElement("figure");
//     let img = document.createElement("img");
//     let figcaption = document.createElement("figcaption");

//     img.setAttribute("src", works[i].imgUrl);
//     img.setAttribute("alt", works[i].title);

//     figcaption.innerText = works[i].title;

//     console.log(works[i].title);
//   }
// }

// generateGalerie();
