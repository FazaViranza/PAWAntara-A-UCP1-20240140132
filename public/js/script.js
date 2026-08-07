const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("nav ul");

if (toggle && menu) {
    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}