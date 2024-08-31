const fs = require("fs");

function getNote(id) {
    return fs.readFileSync("./src/database/note" + id + ".txt", "utf8");
}

function getList() {
    return fs.readFileSync("./src/database/notes.json", "utf8");
}

function saveNote(note) {
    let notes = JSON.parse(getList());
    fs.writeFileSync("./src/database/note" + notes.notes.length + ".txt", note.note, "utf-8");
    notes.notes.push(note.description);
    fs.writeFileSync("./src/database/notes.json", JSON.stringify(notes), "utf-8");
}

module.exports = { getNote, getList, saveNote };
