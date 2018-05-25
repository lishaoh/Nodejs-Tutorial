const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');
const {populateTodos, todos, populateUsers, users} = require('./seed/send');

beforeEach(populateUsers);
beforeEach(populateTodos);

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
        expect(res.body.text).toBe(text);
        expect(res.body.completed).toBe(false);
        expect(res.body.completedAt).toExist();
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if anthenticated', done => {
    request(app)
      .get('/users/me')
      .set('Authorization', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done)
  });

  it('should return 401 if not authenticated', done => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done)
  });
});

describe('POST /users/me', () => {
  it('should create a user', function(done) {
    var email = 'heiheihei@666.com';
    var password = 'hei';

    request(app)
      .post('/users')
      .send({
        email,
        password
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['authorization']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        User.findOne({email}).then(user => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        })
      });
  });
  it('should reduce( validation errors if request inValid)', function(done) {
    request(app)
      .post('/users')
      .send({
        email: 'andrew',
        password: '123'
      })
      .expect(400)
      .end(done);
  });
  it('should not create user if email in use', function(done) {
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: users[0].password
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', function(done) {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['authorization']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then(user => {
          expect(user.tokens[0]).toInclude({
            access: 'Authorization',
            token: res.headers['authorization']
          });
          done();
        }).catch(e => done(e));
      });
  });

  it('should reject invalid login', function(done) {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['authorization']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then(user => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch(e => done(e));
      });
  });
})
