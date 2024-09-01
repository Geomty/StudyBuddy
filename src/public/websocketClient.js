const ws = new WebSocket('ws://'+window.location.hostname+':443/');
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

function send(event, type, data) {
    let obj;
    if (data) {
        obj = { type, data };
    } else {
        obj = { type };
    }
    ws.send(JSON.stringify(obj));
}

document.getElementById("send-note").onclick = event => {
    send(event, "send", inputBox.value);
};

document.getElementById("submit-answer").onclick = event => {
    send(event, "submit", inputBox.value);
};

document.getElementById("request-list").onclick = event => {
    send(event, "reqlist");
};

document.getElementById("request-note").onclick = event => {
    send(event, "request", Number(inputBox.value));
};

document.getElementById("save-note").onclick = event => {
    send(event, "save", inputBox.value);
};
