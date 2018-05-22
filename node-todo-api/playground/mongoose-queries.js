const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('../server/models/user');
// var id = '5b03b403df306f0c9d8ce06b1';

// if (!ObjectID.isValid(id)) {
  // console.log('ID not valid');
// }
// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log('Todo',todo);
// });

// Todo.findById(id).then(todo => {
//   if (!todo) return console.log('Id not found');
//   console.log('Todo by id',todo);
// }).catch(e => console.log(e));
//

// User findById

User.findById('5b02708440644a0de4e7a7af').then(user => {
  if (!user) return console.log('Unable to find user');

  console.log(JSON.stringify(user, undefined, 2));
}, err => console.log(err));
