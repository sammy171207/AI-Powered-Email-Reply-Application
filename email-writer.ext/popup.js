document.getElementById("generateReply").addEventListener("click", () => {
    let emailContent = document.getElementById("emailContent").value.trim();
    let output = document.getElementById("replyOutput");

    if (!emailContent) {
        output.innerText = "Please enter email content.";
        return;
    }

    output.innerText = "Generating...";

    chrome.runtime.sendMessage({ action: "generate_reply", emailContent }, (response) => {
        if (chrome.runtime.lastError) {
            output.innerText = "Error: " + chrome.runtime.lastError.message;
            return;
        }
        if (response?.reply) {
            output.innerText = response.reply;
        } else {
            output.innerText = response?.error || "Failed to generate reply.";
        }
    });
});
