const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatBox = document.querySelector('.chat-box');

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "chat-outgoing" ? `<p>${message}</p>` : `<span class="bot-icon"><i class="fa-solid fa-robot"></i></span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;


    chatBox.appendChild(createChatLi(userMessage, "chat-outgoing"));
    chatInput.value = ''; 

    setTimeout(() => {
        chatBox.appendChild(createChatLi("Thinking...", "chat-incoming"));
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
