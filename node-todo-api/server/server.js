var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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

app.listen(3000, () => {
  console.log('Started on port 3000');
})

module.exports = {app}
