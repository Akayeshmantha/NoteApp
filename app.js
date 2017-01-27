console.log('Starting app');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'Title of a note',
    demand: true,
    alias: 't'
}
const bodyOptions = {
    describe: 'Body of a note',
    demand: true,
    alias: 'b'
}
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all the notes')
    .command('read', 'Read a note', {
        title: titleOptions
    }).command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

if (command === "add") {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log("Note created");
        notes.logNote(note);
    } else {
        console.log("Note exists");
    }
} else if (command === "list") {
    var allNotes = notes.getAll();
    if (allNotes) {
        console.log(`Printing ${allNotes.length} notes`);
        allNotes.forEach((note) => {
            notes.logNote(note);
        });
    } else {
        console.log('No notes to display');
    }
} else if (command === "read") {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log("Note found");
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command === "remove") {
    var removedStatus = notes.removeNote(argv.title);
    var message = removedStatus ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('no command found');
}