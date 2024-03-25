// Init
// async pour la modale
export function gererEditPage() {
  const token = window.sessionStorage.getItem("token");
  if (token !== null) {
    // console.log(token);
    const boxFilter = document.querySelector(".box-filters");
    boxFilter.style.display = "none";
    const header = document.querySelector("body");
    const editHeader = document.createElement("div");
    editHeader.setAttribute("class", "editDiv");
    editHeader.innerHTML = `<p> <i class="fa-regular fa-pen-to-square"></i>Mode édition</p>`;
    header.prepend(editHeader);
    //console.log(boxFilter);
  }
}
