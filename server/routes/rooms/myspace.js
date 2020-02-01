const { generateMessage } = require('../../utils/message')
const { ChatBroker } = require("../../models/Chat");
// Socket.IO stuff: 


const privateChat = (io) => {

    io.on("connection", (socket) => {


        // Recieving a message from user
        socket.on("createMessage", (newMessage, callback) => {
            // io.emit("newMessage", newMessage);
            let message = generateMessage(newMessage.from, newMessage.text)

            ChatBroker.newMessage([newMessage.from, newMessage.to], message)

            callback("Successfully delivered to server");

        })


    })

    return io;

}

module.exports.privateChat = privateChat;