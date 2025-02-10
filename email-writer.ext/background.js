chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "generate_reply") {
        fetch("http://localhost:8080/api/email/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emailContent: request.emailContent })
        })
        .then(response => response.json())
        .then(data => sendResponse({ reply: data.reply }))
        .catch(error => {
            console.error("Error:", error);
            sendResponse({ error: "Failed to generate reply. Check API." });
        });

        return true; // Required for async response
    }
});
