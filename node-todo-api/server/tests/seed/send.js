const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'lsh294753@gmail.com',
  password: '123c',
  tokens: [{
    access: 'Authorization',
    token: jwt.sign({_id: userOneId.toHexString()}, process.env.JWT_SECRET)
  }]
}, {
  _id: userTwoId,
  email: 'lx507714@gmail.com',
  password: '123d',
  tokens: [{
    access: 'Authorization',
    token: jwt.sign({_id: userTwoId.toHexString()}, process.env.JWT_SECRET)
  }]
}]

const todos = [{
  _id: new ObjectID(),
  text: 'Fitst test todo',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 666,
  _creator: userTwoId
}];


const populateTodos = done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
};

const populateUsers = done => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
}

module.exports = {populateTodos, todos, populateUsers, users};
