// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');
  var db = client.db('TodoApp');

  // db.collection('Todos').find({_id: new ObjectID('5afe746d8e28e20168f21f7c')}).toArray().then((docs) => {
  //   console.log('todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, err => {
  //   console.log('Unable to fetch todos', err);
  // })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log('todos');
  //   console.log('Todos count is ', count);
  // }, err => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({name: 'Andrew'}).toArray().then(docs => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, err => {
    console.log('Unable to find Users', err);
  });

  // client.close();
});
