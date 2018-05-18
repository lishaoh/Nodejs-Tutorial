// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB server');
  var db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5aed82adf9c3f5afd37c3ffb')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOrginal: false
  // }).then(result => console.log(result))

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5afe70c761dd490cb869f8e7')
  }, {
    $set: {
      name: 'lsh'
    },
    $inc: {
      age: 22
    }
  }, {
    returnOrginal: false
  }).then(result => console.log(result))

  // client.close();
});
