// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');
  var db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({text: '嘿嘿嘿'}).then(result => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').findOne({text: '嘿嘿'}).then(result => console.log(result));

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({text: '嘿嘿'}).then(result => console.log(result));

  db.collection('Users').deleteMany({name: 'Andrew'}).then(result => console.log(result));
  // client.close();
});
