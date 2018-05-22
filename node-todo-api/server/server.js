const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(data => res.status(200).send(data), err => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/123
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(err => res.status(400).send());
  // Valid id using inValid
    // 404 - send back empty send

  // findById
    // success
      // if todo - send it back
      // if not todo - send back 404 with empty body
    // error
      // 404 - and send empty body back
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch(err => res.status(404).send(err));
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.comletedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.comletedAt = null;
  }

  Todo.findOneAndUpdate(id, {
    $set: body
  }, {
    new: true
  }).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch(e => res.status(404).send(e));
})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {app}
