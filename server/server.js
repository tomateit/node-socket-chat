require('dotenv').config();
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { mainPageChat } = require("./routes/rooms/mainpage");
const publicRoutes = require("./routes/publicRoutes");

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

// Initializing express
const app = express();
// Express settings
app.set('views', path.join(__dirname, "..","views"));
app.set('view engine', 'hbs');
hbs.registerPartials( path.join(__dirname,"..","views","partials"));
// Express plugins
app.use(bodyParser.json());
app.use(cookieParser())
// Custom routes
app.use(publicRoutes);

app.use(express.static(publicPath));


let server = http.createServer(app);
// Initializing Socket.IO features
let io = socketIO(server);

mainPageChat(io);


server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});