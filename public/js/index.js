var socket = io();

socket.on("connect", function() {
    console.log("CONNECTed");


});

function keyPressEventListener(e) {
    var characterCode=e.keyCode || e.which;
    if(characterCode == 13){
        sendMessage()
    } else {
        return false;
    }
}

var sendMessage = function(event) {
    
    var text = document.querySelector('#message').value
    document.querySelector('#message').value = ""
    var username = document.querySelector('#username').value
    socket.emit('createMessage', {time: Date.now(), text, from: username});
}

document.getElementById("send").addEventListener("click", sendMessage)
document.getElementById("message").addEventListener("keydown", keyPressEventListener)

socket.on("disconnect", function() {
    console.log("DISCONNECT");
});

socket.on('newMessage', function(message){
    console.log("New message: ", message);
    var newMessage = document.createElement("div")
    newMessage.innerHTML = `<span style="{display:block}">${message.from} :</span><p>${message.text}</p><hr />`
    document.getElementsByTagName("fieldset")[0].append(newMessage)
});

