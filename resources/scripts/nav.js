const modal = document.getElementById("modal");
const body = document.body;
let width = window.innerWidth;

function hideNav(id) {
  const nav = document.getElementById(id);
  nav.hidden = true;
}

function showNav(id) {
  const nav = document.getElementById(id);
  nav.hidden = false;
}

function navSizeSelector() {
  if (isScreenSmall()) {
    hideNav("navbar-big-screens");
    showNav("navbar-small-screens");
  } else {
    hideNav("navbar-small-screens");
    showNav("navbar-big-screens");
  }
}
width = window.innerWidth;
navSizeSelector();

window.addEventListener("resize", () => {
  width = window.innerWidth;
  navSizeSelector();
});

function isScreenSmall() {
  return width < 991;
}

function openModal() {
  modal.style.display = "block";
  body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  body.style.overflow = "unset";
}

const modalOpenButton = document.getElementById("modal-open-button");
modalOpenButton.addEventListener("click", openModal);

const modalCloseButton = document.getElementById("modal-close-button");
modalCloseButton.addEventListener("click", closeModal);

const liList = document.querySelectorAll(".modal-links li").forEach((li) => {
  if (li) {
    li.addEventListener("click", closeModal);
  }
});

const navLinks = document.getElementsByClassName("nav-links");
for (const link of navLinks) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToPosition(link.getAttribute("href"));
  });
}

function scrollToPosition(positionId) {
  const elmnt = document.getElementById(positionId.split("#").pop());
  elmnt.scrollIntoView({ behavior: "smooth" });
}
