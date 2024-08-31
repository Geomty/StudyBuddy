const startConversation = require("./api");
const { getNote, getList, saveNote } = require("./database");

async function handleClient(client) {
    client.send(JSON.stringify({
        type: "debug",
        data: "Child process running"
    }));
    client.on("message", async m => {
        let message = JSON.parse(m.toString());
        if (message.type === "send") { // Client is sending notes and is waiting for the first question
            // TODO
        } else if (message.type === "submit") { // Client is sending answer to question and is waiting for a response and another question
            // TODO
        } else if (message.type === "reqlist") { // Client is requesting list of other users' notes (and ids)
            // TODO
        } else if (message.type === "request") { // Client is requesting specific notes, and providing an id for the specific note
            // TODO
        } else if (message.type === "save") { // Client is sending notes to be saved in the "database" (how kind of them to share)
            // TODO
        } else {
            client.send(JSON.stringify({
                type: "debug",
                data: "Invalid message."
            }));
        }
    })
}

module.exports = handleClient;
