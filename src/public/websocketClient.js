const ws = new WebSocket('ws://'+ipAddress+':443/');
ws.addEventListener("open", async () => {
    console.log("Websocket connected");
});

const inputBox = document.getElementById("note");
const outputBox = document.getElementById("server-message");

ws.onmessage = event => {
    let message = JSON.parse(event.data);
    switch (message.type) {
        case "debug":
            console.log("Debug: " + message.data);
            break;
        case "question": // Question for the user to answer
            outputBox.innerText = message.data;
            break;
        case "answer": // Correct answer to the previous question
            outputBox.innerText = message.data;
            break;
        case "note": // Another user's notes that are stored on the server
            outputBox.innerText = message.data;
            break;
        case "list": // List of notes for the user to select from
            outputBox.innerText = message.data;
            break;
        default:
            console.log(`Invalid message from server: ${message.data}`);
    }
}

async function sendMessage(message, event) {
    await ws.send(message);
    event.preventDefault();
}

document.getElementById("send-note").onclick = event => {
    sendMessage(JSON.stringify({
        type: "send",
        data: inputBox.value
    }), event);
};

document.getElementById("submit-answer").onclick = event => {
    sendMessage(JSON.stringify({
        type: "submit",
        data: inputBox.value
    }), event);
};

document.getElementById("request-list").onclick = event => {
    sendMessage(JSON.stringify({
        type: "reqlist"
    }), event);
};

document.getElementById("request-note").onclick = event => {
    sendMessage(JSON.stringify({
        type: "request",
        data: Number(inputBox.value)
    }), event);
};

document.getElementById("save-note").onclick = event => {
    sendMessage(JSON.stringify({
        type: "save",
        data: inputBox.value
    }), event);
};
