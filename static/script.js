
//variables for chat-input textarea, sendChatBtn and chatBox
const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatBox = document.querySelector('.chat-box');

//variable for user input
let userMessage;


const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "chat-outgoing" ? `<p>${message}</p>` : `<span class="bot-icon"><i class="fa-solid fa-robot"></i></span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

//Function to generate the chatBot response by accessing the API
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

    if (chatInput.value.includes("gate-5") || chatInput.value.includes("gate 5")) {
        chatBox.removeChild(incomingChatLi);
        chatBox.appendChild(createChatLi("Redirecting you to Boarding Gate 5", "chat-incoming"));
        setTimeout(function() {
            window.open("https://cathayhackathon.s3.amazonaws.com/export/1/MyProject-HTML5-Shipping.html");
        }, 1500);
    }
    else if (chatInput.value.includes("booth-35") || chatInput.value.includes("booth 35")) {
        chatBox.removeChild(incomingChatLi);
        chatBox.appendChild(createChatLi("Redirecting you to Check-in Booth 35", "chat-incoming"));
        setTimeout(function() {
            window.open("https://cathayhackathon.s3.amazonaws.com/export/2/MyProject-HTML5-Shipping.html");
        }, 1500);

    }
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

//Function to handle chat
const handleChat = () => {
    userMessage = chatInput.value;
    if (!userMessage) return;

    chatBox.appendChild(createChatLi(userMessage, "chat-outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight);
    //chatInput.value = '';

    setTimeout(generateResponse, 600);
};

//EventListeners for clicking send and pressing enter
sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        handleChat();
    }
});
