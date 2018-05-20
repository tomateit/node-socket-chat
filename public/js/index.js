var socket = io();

socket.on("connect", function() {
    console.log("CONNECTed");


});

socket.emit('createMessage', {time: Date.now(), text:"Hi, sweetherat", from: "me"});

socket.on("disconnect", function() {
    console.log("DISCONNECT");
});

socket.on('newMessage', function(message){
    console.log("New message: ", message);
});

