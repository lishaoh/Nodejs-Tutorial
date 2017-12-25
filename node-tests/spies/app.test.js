const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {
  var db = {
    saveUser: expect.createSpy()
  };

  app.__set__('db', db);

  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('Andrew', 24);
    expect(spy).toHaveBeenCalledWith('Andrew', 24);
  });

  it('should call saveUser with user Object', () => {
    var email = 'lsh@294753gmail.com';
    var password = '123';

    app.handleSignup(email, password);

    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  })
})
