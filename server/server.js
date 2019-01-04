const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;


const app = express();

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log("new user connected");

    socket.broadcast.emit('newMessage', generateMessage("server", "New user connected"));

    socket.emit('newMessage', generateMessage("Server","Welcome in our chat"));

    socket.on('disconnect', ()=>{
        console.log("user was disconnected");
    });

    socket.on('createMessage', (newMessage, callback)=>{
        // io.emit('newMessage', newMessage);
        socket.broadcast.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        console.log('send new MEssage', newMessage);
        callback("Successfully delivered to server");
        // socket.emit('newMessage', newMessage)
    })

})



app.use(express.static(publicPath));


server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});