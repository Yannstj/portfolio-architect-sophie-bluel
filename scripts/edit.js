// Init

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
  modalSpan.setAttribute("class", "modal1");
  const modalAnchor = document.createElement("a");
  modalAnchor.setAttribute("href", "#modal1");
  modalAnchor.setAttribute("class", "js-modal");
  modalAnchor.innerHTML = `<i class="fa-regular fa-pen-to-square"><p>modifier</p></i>`;
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
    dialog.close();
  });
}

export function removeImage() {
  document.addEventListener("click", (event) => {
    event.preventDefault();
    // here we use closest methodes because queryselector doesnt work on i tag
    const trashIcon = event.target.closest(".fa-trash-can");
    const imgSelected = event.target.closest(".trashIcon");
    if (trashIcon !== null) {
      const img = imgSelected.querySelector("img");
      const imgID = img.getAttribute("id");
      console.log(imgID);
      async function removeSelectedImg() {
        let token = window.sessionStorage.getItem("token");
        // permet de recuperer le token au bon format
        token = JSON.parse(token).token;
        const deleteRequest = await fetch(
          `http://localhost:5678/api/works/${imgID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            method: "DELETE",
          }
        );
        if (deleteRequest.ok) {
          console.log("hello");
          imgSelected.remove();
        }
      }
      removeSelectedImg();
    }
  });
}
