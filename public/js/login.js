const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const errorMessage = document.getElementById("errorMessage");

    if (!username || !password) {

        errorMessage.textContent = "Semua field wajib diisi";

        return;

    }

    const response = await fetch("/api/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            username,
            password

        })

    });

    const data = await response.json();

    if (response.ok) {

        window.location.href = "/dashboard";

    } else {

        errorMessage.textContent = data.message;

    }

});