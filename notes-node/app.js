console.log('Starting app.');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;

var command = argv._[0];
console.log('command: ', command);
console.log('Process ', process.argv);
console.log('Yargs: ', argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    console.log('----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('Note title token');
  }
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  notes.getNote(argv.title);
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}

// console.log(_.isString(true));
// console.log(_.isString('lsh'));
// var filteredArray = _.uniq(['lsh']);
// console.log(filteredArray);
// console.log('Result: ', notes.add(1, 5));
// var res = notes.addNote();
// console.log(res);

// var user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello ${user.username}! Yor are ${notes.age}.`);
