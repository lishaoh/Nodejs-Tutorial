const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'Fitst test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 666
}];

beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
})

describe('POST /todos', () => {
  it('should create a new todo', done => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then(todos => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        })
        .catch(e => done(e));
    })
  });
  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then(todos => {
          expect(todos.length).toBe(2);
          done();
        })
        .catch(e => done(e));
    })
  });
})

describe('GET /todos', () => {
  it('should be all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
});

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    // make sure you get a 404 back
    var hexId = new ObjectID();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  });

  it('should return 404 for non-object ids', done => {
    // /todos/123
    request(app)
      .get(`/todos/123abd`)
      .expect(404)
      .end(done)
  })
});

describe('DELETE /todos/:id', () => {
  it('should remove a todos', done => {
    var hexoId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${hexoId}`)
      .expect(200)
      .expect(res => {
        console.log(res.body)
        expect(res.body._id).toBe(hexoId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexoId).then(todo => {
          expect(todo).toNotExist();
          done();
        }).catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', done => {
    var hexoId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexoId}`)
      .expect(404)
      .end(done)
  });

  it('should return 404 if object id is inValid', function(done) {
    // body...
    request(app)
      .delete(`/todos/31`)
      .expect(404)
      .end(done)
  })
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', function(done) {
    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
        expect(res.body.completed).toBe(true);
        expect(res.body.completedAt).toBeA('number');
      })
      .end(done);
    // body...
  });

  it('should clear completedAt when todo is completed', function(done) {
    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the new text !!!';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect(res => {
        console.log(res.body)
        expect(res.body.text).toBe(text);
        expect(res.body.completed).toBe(false);
        expect(res.body.completedAt).toNotExist();
      })
      .end(done);
    // body...
  });
})
