const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("message");
const chatBox = document.getElementById("chatBox");

chatForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    chatBox.innerHTML += `
        <p>
            <strong>Anda:</strong> ${message}
        </p>
    `;

    messageInput.value = "";

    const response = await fetch("/api/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: message
        })

    });

    const data = await response.json();

    if (response.ok) {

        chatBox.innerHTML += `
            <p>
                <strong>AI:</strong> ${data.data.reply}
            </p>
        `;

    } else {

        chatBox.innerHTML += `
            <p>
                <strong>AI:</strong> ${data.message}
            </p>
        `;

    }

});