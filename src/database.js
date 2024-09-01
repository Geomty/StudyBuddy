const fs = require("fs");

function getNote(id) {
    if (!fs.existsSync("./src/database/note" + id + ".txt")) return new Error("Note does not exist.");
    return fs.readFileSync("./src/database/note" + id + ".txt", "utf8");
}

function getList() {
    if (!fs.existsSync("./src/database/notes.json")) {
        if (!fs.existsSync("./src/database")) fs.mkdirSync("./src/database");
        fs.writeFileSync("./src/database/notes.json", JSON.stringify({ notes: [] }));
        return JSON.stringify({ notes: [] });
    } else return JSON.parse(fs.readFileSync("./src/database/notes.json", "utf8")).notes.toString();
}

function saveNote(note) {
    let notes = JSON.parse(getList()).notes;
    fs.writeFileSync("./src/database/note" + notes.length + ".txt", note.note);
    notes.push(note.description);
    fs.writeFileSync("./src/database/notes.json", JSON.stringify({ notes }));
}

module.exports = { getNote, getList, saveNote };
