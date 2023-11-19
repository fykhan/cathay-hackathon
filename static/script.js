

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

const generateResponse = () => {
    const API_URL = "/get_response";
    const incomingChatLi = createChatLi("Thinking...", "chat-incoming");
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight);

    const user_input = chatInput.value.trim();

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input }),
    };
    /*if (chatInput.value.includes("gate-5")){
        chatBox.removeChild(incomingChatLi);
        chatBox.appendChild(createChatLi("Directing you to gate-5", "chat-incoming"));
    }
    else {*/
    fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            const responseMessage = data.response;
            chatBox.removeChild(incomingChatLi);
            chatBox.appendChild(createChatLi(responseMessage, "chat-incoming"));
            chatBox.scrollTo(0, chatBox.scrollHeight);
            
            
            // Print the response message
            console.log(responseMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        }); 
        chatInput.value = ''
};

const handleChat = () => {
    userMessage = chatInput.value;
    if (!userMessage) return;

    chatBox.appendChild(createChatLi(userMessage, "chat-outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight);
    //chatInput.value = '';

    setTimeout(generateResponse, 600);
};

sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        handleChat();
    }
});