function injectReplyButton() {
    let emailBody = document.querySelector(".a3s.aiL"); // Gmail email body
    if (!emailBody) return;

    let replyBox = document.querySelector(".editable");
    if (!replyBox) return;

    let existingButton = document.getElementById("ai-reply-button");
    if (existingButton) return;

    let button = document.createElement("button");
    button.id = "ai-reply-button";
    button.innerText = "AI Generate Reply";
    button.style.cssText = "background-color:#0D41E1;color:white;padding:8px;border-radius:4px;margin-top:10px;cursor:pointer;";

    button.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "generate_reply", emailContent: emailBody.innerText }, (response) => {
            if (response?.reply) {
                replyBox.innerText = response.reply;
            } else {
                alert("Error generating reply. Please try again.");
            }
        });
    });

    replyBox.parentElement.appendChild(button);
}

// Run when Gmail loads a new email
setInterval(injectReplyButton, 3000);
