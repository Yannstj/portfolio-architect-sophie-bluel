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
  //modalAnchor.innerText = "Hello";
  modalAnchor.innerHTML = `<i class="fa-regular fa-pen-to-square">modifier`;
  mesProjets.appendChild(modalSpan);
  modalSpan.appendChild(modalAnchor);
  displayModal();
}

export function displayModal() {
  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", (event) => {
      event.preventDefault();
      //console.log(event);
      // here we use current Target beacause if not we get icon tag
      const target = document.querySelector(
        event.currentTarget.getAttribute("href")
      );
      console.log(target);
      target.style.display = null;
      target.removeAttribute("arial-modal", "true");
      target.setAttribute("aria-modal", "true");
    });
  });
}

//displayModal();
