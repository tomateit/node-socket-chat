const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;


const app = express();

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log("new user connected");

    io.sockets.emit('newMessage', {
        from: "Server",
        text: "New user connected!",
        time: "time"
    });

    socket.emit('newMessage', {
        from: "Server",
        text: "Welcome in our chat",
        time: "time"
    });

    socket.on('disconnect', ()=>{
        console.log("user was disconnected");
    });

    socket.on('createMessage', (newMessage)=>{
        io.sockets.emit('newMessage', newMessage);
        console.log('send new MEssage', newMessage);
        // socket.emit('newMessage', newMessage)
    })

})



app.use(express.static(publicPath));


server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});