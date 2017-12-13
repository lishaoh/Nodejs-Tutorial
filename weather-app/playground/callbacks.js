var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Andrew'
  };

  setTimeout(() => {
    callback(user);
  }, 2000);
}

getUser(23, (userObject) => {
  console.log(userObject);
})
