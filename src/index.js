import "./style.css";

const rightList = document.querySelector(".list-right");
const leftList = document.querySelector(".list-left");

document.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("id", event.target.id);
  event.target.classList.add("drag");
  setTimeout(() => {
    event.target.classList.remove("drag");
  });
});

document.addEventListener("drag", (event) => {
  console.log("drag : ", event);
});

document.addEventListener("dragend", (event) => {
  console.log("dragend : ", event);
});

rightList.addEventListener("dragenter", (event) => {
  event.target.classList.add("drop");
  console.log("dragenter : ", event);
});

rightList.addEventListener("dragleave", (event) => {
  event.target.classList.remove("drop");
  console.log("dragleave : ", event);
});

rightList.addEventListener("dragover", (event) => {
  event.preventDefault();
  console.log("dragover : ", event);
});

rightList.addEventListener("drop", (event) => {
  const elem = document.getElementById(event.dataTransfer.getData("id"));
  event.target.appendChild(elem);
  console.log("drop : ", event);
});

window.addEventListener("drop", (event) => {
  event.preventDefault();
});

window.addEventListener("dragover", (event) => {
  event.preventDefault();
});

leftList.addEventListener("dragover", (event) => {
  event.preventDefault();
});

leftList.addEventListener("drop", (event) => {
  event.preventDefault();

  // Vérifie si un élément glissé provient de `rightList`
  const elementId = event.dataTransfer.getData("id");
  if (elementId) {
    const elem = document.getElementById(elementId);
    leftList.appendChild(elem); // Ajoute l'élément au `leftList`
    console.log("Élément déplacé de droite à gauche :", elem);
  } else {
    // Gestion des fichiers (existant déjà dans votre code)
    Array.from(event.dataTransfer.files).forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        const image = new Image();
        image.src = fileReader.result;
        image.id = "second"; // Assurez-vous que chaque id est unique
        image.draggable = true; // Rend l'image draggable
        leftList.appendChild(image);
      };
    });
  }
});
