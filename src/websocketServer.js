const Conversation = require("./api");
const { getNote, getList, saveNote } = require("./database");

async function handleClient(client) {
    let conversation;
    send("debug", "Child process running");
    client.on("message", async m => {
        let message = JSON.parse(m.toString());
        if (message.type === "send") { // Client is sending notes and is waiting for the first question
            conversation = new Conversation(message.data);
            send("question", await conversation.generateQuestion());
        } else if (message.type === "submit") { // Client is sending answer to question and is waiting for a response and another question
            send("answer", await conversation.validateAnswer(message.data));
        } else if (message.type === "reqlist") { // Client is requesting list of other users' notes (and ids)
            send("list", getList());
        } else if (message.type === "request") { // Client is requesting specific notes, and providing an id for the specific note
            send("note", getNote(message.data));
        } else if (message.type === "save") { // Client is sending notes to be saved in the "database" (how kind of them to share)
            saveNote({ note: message.data, description: "TODO" });
        } else {
            send("debug", "Invalid message.");
        }
    });

    function send(type, data) {
        client.send(JSON.stringify({ type, data }));
    }
}

module.exports = handleClient;
