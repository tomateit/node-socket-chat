class Chat {
    constructor(participants, message) {
        this.participants = this.createChatID(participants)
        this.newMessage(message)
    }

    messages = []

    participants

    newMessage = (message) => {
        this.messages.push(message);
    }

    static createChatID(participants) {
        return participants.sorted().join("|")
    }
}

class ChatBroker {
    constructor() {

    }

    memory = {};

    static sendMessage(participants, message) {
        const chatId = Chat.createChatID(participants)
        let chat = memory[chatId]
        if (chat) {
            return chat.newMessage(message)
        }
        memory[chatId] = new Chat(participants, message)

    }
}


module.exports = { ChatBroker };