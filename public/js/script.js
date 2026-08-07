const toggle = document.getElementById("navToggle");
const menu = document.getElementById("navMenu");

if (toggle && menu) {

    toggle.addEventListener("click", () => {

        menu.classList.toggle("active");

        const expanded = menu.classList.contains("active");

        toggle.setAttribute("aria-expanded", expanded);

    });

}