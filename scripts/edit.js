// Init
let modal = null;

export function logOut() {
  const token = window.sessionStorage.getItem("token");
  if (token !== null) {
    const loginAnchor = document.getElementById("loginAnchor");
    loginAnchor.setAttribute("href", "#");
    loginAnchor.innerHTML = "logout";
    loginAnchor.addEventListener("click", (event) => {
      window.sessionStorage.removeItem("token");
      location.reload();
    });
  }
}
// async pour la modale
export function gererEditPage() {
  const token = window.sessionStorage.getItem("token");
  if (token !== null) {
    // hide filters btn
    const boxFilter = document.querySelector(".box-filters");
    boxFilter.style.display = "none";
    // add edit mode indication
    const body = document.querySelector("body");
    const editHeader = document.createElement("div");
    editHeader.setAttribute("class", "editDiv");
    editHeader.innerHTML = `<p> <i class="fa-regular fa-pen-to-square"></i>Mode édition</p>`;
    body.prepend(editHeader);
    setModifierButton();
  }
}

export function setModifierButton() {
  const mesProjets = document.querySelector("#portfolio h2");
  const modalSpan = document.createElement("span");
  const modalAnchor = document.createElement("a");
  modalAnchor.setAttribute("href", "#modal1");
  modalAnchor.setAttribute("class", "js-modal");
  modalAnchor.innerHTML = `<i class="fa-regular fa-pen-to-square">modifier`;
  mesProjets.appendChild(modalSpan);
  modalSpan.appendChild(modalAnchor);
  displayModal();
  closeModal();
}

export function displayModal() {
  const modalLink = document.querySelector(".js-modal");
  const dialog = document.querySelector("dialog");
  modalLink.addEventListener("click", () => {
    dialog.showModal();
  });
}

export function closeModal() {
  const jsCloseModal = document.querySelector(".js-close-modal");
  const dialog = document.querySelector("dialog");
  jsCloseModal.addEventListener("click", () => {
    console.log("btn pressed");
    dialog.close();
  });
}
