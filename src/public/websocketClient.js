const ws = new WebSocket('ws://'+window.location.hostname+':443/');
ws.addEventListener("open", async () => {
    console.log("Websocket connected");
});

const note = document.getElementById("note");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const search = document.getElementById("search");
const notes = document.getElementById("notes");

ws.onmessage = event => {
    let message = JSON.parse(event.data);
    switch (message.type) {
        case "debug":
            console.log("Debug: " + message.data);
            break;
        case "question": // Question for the user to answer
            question.innerText = message.data;
            break;
        case "answer": // Correct answer to the previous question and whether the user got it right
            question.innerText = message.data;
            break;
        case "note": // Another user's notes that are stored on the server
            notes.innerText = message.data;
            break;
        case "list": // List of notes for the user to select from
            notes.innerText = JSON.parse(message.data).notes.toString();
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

document.getElementById("generate-question").onclick = event => {
    if (!note.value) return;
    send(event, "send", note.value);
    document.getElementById("generate-question").disabled = true;
    document.getElementById("submit-answer").disabled = false;
    answer.disabled = false;
};

// document.getElementById("save-note").onclick = event => {
//     if (!note.value) return;
//     send(event, "save", note.value);
// };

document.getElementById("submit-answer").onclick = event => {
    if (!answer.value) return;
    send(event, "submit", answer.value);
    document.getElementById("generate-question").disabled = false;
    document.getElementById("submit-answer").disabled = true;
    answer.disabled = true;
    answer.value = "";
};

let focused = false;
answer.onfocus = () => focused = true;
answer.onfocusout = () => focused = false;
document.addEventListener("keypress", event => {
    if (event.key == "Enter" && focused) document.getElementById("submit-answer").click();
});

// document.getElementById("request-list").onclick = event => {
//     send(event, "reqlist");
// };

// document.getElementById("request-note").onclick = event => {
//     if (!search.value) return;
//     send(event, "request", search.value);
// };