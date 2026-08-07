const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {

    await fetch("/api/logout", {
        method: "POST"
    });

    window.location.href = "/login";

});