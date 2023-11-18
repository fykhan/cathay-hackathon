const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatBox = document.querySelector('.chat-box');
const API_KEY = "";


let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "chat-outgoing" ? `<p>${message}</p>` : `<span class="bot-icon"><i class="fa-solid fa-robot"></i></span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () => {
    const API_URL = "";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application.json",
            "Authorization" : `Bearer ${API_KEY}`

        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(date => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Oops! Something went wrong. Please Try Again.";
    }).finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;


    chatBox.appendChild(createChatLi(userMessage, "chat-outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight);
    chatInput.value = ''; 

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "chat-incoming")
        chatBox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
