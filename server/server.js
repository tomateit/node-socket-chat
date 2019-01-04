const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const {generateMessage} = require('./utils/message')

const publicRoutes = require("./routes/publicRoutes");

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;


const app = express();

app.use(bodyParser.json());

hbs.registerPartials( path.join(__dirname,"..","views","partials"));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "..","views"));

app.use(publicRoutes);

// Socket.IO stuff: 

// Temporary message buffer
let messageBuffer = []
function storeMessage (message) {
    while(messageBuffer.length > 10) {
        messageBuffer.shift()
    }
    messageBuffer.push(message);
}
// Active connections counter
let connectionCounter = 0;

let server = http.createServer(app);
let io = socketIO(server);
io.on("connection", (socket) => {

    //Counting connections
    console.log("new user connected");
    connectionCounter+=1;
    io.emit("userCount", connectionCounter);

    // Greeting the user
    socket.broadcast.emit("newMessage", generateMessage("Server", "New user connected"));
    socket.emit("newMessage", generateMessage("Server","Welcome in our chat"));

    // Sending chat history to user
    messageBuffer.forEach(message => {
        socket.emit("newMessage", message);
    })

    // Recieving a message from user
    socket.on("createMessage", (newMessage, callback)=>{
        // io.emit("newMessage", newMessage);
        let message =  generateMessage(newMessage.from, newMessage.text)

        storeMessage(message);
        socket.broadcast.emit("newMessage", message);
        console.log("Broadcasted new message: ", message);
        callback("Successfully delivered to server");
        // socket.emit("newMessage", newMessage)
    })

    // Handling the user disconnect
    socket.on('disconnect', ()=>{
        console.log("user was disconnected");
        connectionCounter-=1;
        io.emit('userCount', connectionCounter);
    });

})

app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});