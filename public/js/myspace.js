var socket = io();

function logCookie(cookie) {
    if (cookie) {
        console.log(cookie.value);
    }
}

function getCookie(tabs) {
    var getting = browser.cookies.get({
        url: tabs[0].url,
        name: "Auth"
    });
    getting.then(logCookie);
}

var getActive = browser.tabs.query({
    active: true,
    currentWindow: true
});
getActive.then(getCookie);


var addresseeInput = document.getElementById("addressee");
var textpayloadInput = document.getElementById("message");
var sendButton = document.getElementById("send");
var connectionStatus = document.getElementById("connection-status");
var connectionCounter = document.getElementById("connection-counter");

// console.log("This is the button:",sendButton)
// sendButton.addEventListener("click", sendMessageListener);

textpayloadInput.addEventListener("keypress", keyPressEventListener);

// socket.on("connect", function() {
//     console.log("CONNECTED");
//     connectionStatus.innerHTML= "You are connected to server!"
//     connectionStatus.className = "green"
// });

// socket.on("disconnect", function() {
//     console.log("DISCONNECT");
//     connectionStatus.innerHTML= "You are disconnected from server!"
//     connectionStatus.className = "red"
//     connectionCounter.innerHTML = "Nobody is online 4U."
// });

// socket.on("userCount", function(count) {
//     console.log("User count update: ", count);
//     connectionCounter.innerHTML= `Active connections: ${count}`
// });

// socket.on("newMessage", function(message){
//     console.log("New message: ", message);
//     addMessageToTheScreen(message);
// });

//-------------------------



function keyPressEventListener(e) {
    var characterCode = e.keyCode || e.which;
    if (characterCode == 13) {
        sendMessageListener()
    } else {
        return false;
    }
}

var sendMessageListener = function (event) {
    var text = textpayloadInput.value.trim();
    var to = addresseeInput.value.trim();

    if (!to) {
        return alert("Please choose a name!")
    }
    if (!text) {
        return alert("Please enter a text!")
    }

    var message = {
        to,
        text
    }

    addMessageToTheScreen(message)
    sendMessageToServer(message)
}

function sendMessageToServer(message) {
    socket.emit("createMessage", message, (response) => {
        console.log("delivered", response)
        textpayloadInput.value = "";
    });
}

function addMessageToTheScreen(message) {
    var newMessage = document
        .createElement("div")
    newMessage.className = "message"
    newMessage.innerHTML = `<span class="sender">${message.from} :</span><p class="messsage-text">${message.text}</p>`
    document.getElementsByClassName("chat-container")[0].prepend(newMessage);
}


