require("dotenv").config();
const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { mainPageChat } = require("./routes/rooms/mainpage");
const { privateChat } = require("./routes/rooms/myspace");
const publicRoutes = require("./routes/publicRoutes");

const publicPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "views");
const PORT = process.env.PORT || 3000;

// Initializing express
const app = express();

// Express settings
app.set("views", viewsPath);
nunjucks.configure("views", {
    autoescape: true,
    express: app
});
app.set("view engine", "html");

// Express plugins
app.use(cookieParser());
// Custom routes
app.use(publicRoutes);

app.use("/static", express.static(publicPath));

let server = http.createServer(app);
// Initializing Socket.IO features
let io = socketIO(server);

mainPageChat(io);
privateChat(io);

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});