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
  modalAnchor.innerHTML = `<i class="fa-regular fa-pen-to-square" id="penTwo"><p>modifier</p></i>`;
  mesProjets.appendChild(modalSpan);
  modalSpan.appendChild(modalAnchor);
  displayModal();
  closeModal();
}

// const myButton = document.getElementById('myButton');
// myButton.addEventListener('click', () => myDialog.showModal());

// const myDialog = document.getElementById('myDialog');
// myDialog.addEventListener('click', () => myDialog.close());

// const myDiv = document.getElementById('myDiv');
// myDiv.addEventListener('click', (event) => event.stopPropagation());

export function displayModal() {
  const modalLink = document.querySelector(".js-modal");
  const dialog = document.querySelector("dialog");
  modalLink.addEventListener("click", () => {
    dialog.showModal();
  });
}

export function closeModal() {
  const dialog1 = document.querySelector(".modal");
  const dialog2 = document.querySelector(".modal2");

  const jsCloseModal = document.querySelector(".js-close-modal");
  jsCloseModal.addEventListener("click", () => {
    dialog1.close();
  });
  const jsCloseModal2 = document.querySelector(".js-close-modal2");
  jsCloseModal2.addEventListener("click", () => {
    dialog1.close();
    dialog2.close();
  });
}

export function closeModalOutside() {
  const modal = document.querySelector(".modal");
  const modal2 = document.querySelector(".modal2");
  const modalWrapper = document.querySelector(".modal-wrapper");
  const modalWrapper2 = document.querySelector(".modal-wrapper2");
  modal.addEventListener("click", () => {
    modal.close();
  });
  modal2.addEventListener("click", () => {
    modal.close();
    modal2.close();
  });
  modalWrapper.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  modalWrapper2.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}
closeModalOutside();

export function returnModal2() {
  const returnArrow = document.querySelector(".js-return");
  const dialog2 = document.querySelector(".modal2");
  returnArrow.addEventListener("click", () => {
    dialog2.close();
  });
}

export function removeImage() {
  document.addEventListener("click", (event) => {
    event.preventDefault(); //this line cause a bug
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
          // premet de voir l'image ce supprimer sur la modal, mais la ferme quand même
          imgSelected.remove();
        }
      }
      removeSelectedImg();
    }
  });
}

export function displayModal2(addButton) {
  //const modal = document.querySelector(".modal");
  const modal2Anchor = document.querySelector(".modal2");
  addButton.addEventListener("click", () => {
    modal2Anchor.showModal();
    //console.log("hello");
  });
  returnModal2();
}
