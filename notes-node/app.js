console.log('Starting app.');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

console.log('Result: ', notes.add(1, 5));
// var res = notes.addNote();
// console.log(res);

// var user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello ${user.username}! Yor are ${notes.age}.`);
