const fs = require('fs');

/**
 * Fetching all notes
 */
var fetchNote = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

/**
 * Saving given note
 * object
 */
var saveNote = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

/**
 * Adding a note 
 */
var addNote = (title, body) => {
    var notes = fetchNote();

    var note = {
        title,
        body
    }

    var duplicateNotes = notes.filter((note) => note.title == title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNote(notes);
        return note;
    }
};

/**
 * Returning all
 * notes
 */
var getAll = () => {
    return fetchNote();
};

/**
 * Returning the 
 * note according to
 * the given title
 */
var getNote = (title) => {
    var notes = fetchNote();
    var filteredNote = notes.filter((note) => { note.title === title });
    return filteredNote[0];
};

/**
 * Removing the 
 * given note
 */
var removeNote = (title) => {
    var notes = fetchNote();
    var filteredNotes = notes.filter((note) => { note.title !== title })
    saveNote(filteredNotes);

    return filteredNotes.length !== notes.length;
};

/**
 * printing the note
 *  details
 */
var logNote = (note) => {
    console.log("--");
    console.log(`Title : ${note.title}`);
    console.log(`Body : ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};