var socket = io();

function keyPressEventListener(e) {
    var characterCode=e.keyCode || e.which;
    if(characterCode == 13){
        sendMessage()
    } else {
        return false;
    }
}


var sendMessageListener = function(event) {
    event.preventDefault(); 
    var message = {
        from: document.getElementById("username").value, 
        text: document.getElementById("message").value
    }
    addMessageToTheScreen(message)
    sendMessage(message)   
}

function sendMessage(from, text) {
    socket.emit('createMessage', {text, from}, (response) => {
        console.log("delivered", response)
    });
}

document.getElementById('message-form').addEventListener('submit', sendMessageListener)

socket.on("connect", function() {
    console.log("CONNECTed");
});

socket.on("disconnect", function() {
    console.log("DISCONNECT");
});

socket.on('newMessage', function(message){
    console.log("New message: ", message);
    addMessageToTheScreen(message);
});

function addMessageToTheScreen(message) {
    var newMessage = document.createElement("div")
    newMessage.innerHTML = `<span style="{display:block}">${message.from} :</span><p>${message.text}</p><hr />`
    document.getElementsByTagName("fieldset")[0].append(newMessage)
}

