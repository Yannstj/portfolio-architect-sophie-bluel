// Init
let modal = null;
// async pour la modale
export function gererEditPage() {
  const token = window.sessionStorage.getItem("token");
  if (token !== null) {
    // console.log(token);
    const boxFilter = document.querySelector(".box-filters");
    //console.log(boxFilter);
    boxFilter.style.display = "none";
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
}

export function displayModal() {
  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", (event) => {
      event.preventDefault();
      // here we use current Target beacause if not we get icon tag
      modal = document.querySelector(event.currentTarget.getAttribute("href"));
      modal.style.display = null;
      modal.removeAttribute("arial-modal", "true");
      modal.setAttribute("aria-modal", "true");
      closeModal();
      // modal
      //   .querySelector(".js-close-modal")
      //   .addEventListener("click", (event) => {
      //     closeModal(modal);
      //   });
      // modal
      //   .querySelector(".js-stop-modal")
      //   .addEventListener("click", (event) => {
      //     event.stopPropagation();
      //   }); this dont work for some reason
    });
  });
}

function closeModal() {
  modal.addEventListener("click", (event) => {
    if (modal === null) return;

    event.preventDefault();

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");

    modal.removeEventListener("click", () => {
      closeModal();
    });
    modal
      .querySelector(".js-close-modal")
      .removeEventListener("click", (event) => {
        closeModal();
      });
    // modal
    //   .querySelector(".js-stop-modal")
    //   .removeEventListener("click", (event) => {
    //     event.stopPropagation();
    //   });
    modal = null;
    //console.log(modal);
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.key === "Esc") {
    //console.log(event);
    closeModal();
  }
});
