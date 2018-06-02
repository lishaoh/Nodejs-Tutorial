const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
        id: 1,
        name: 'lsh',
        room: '1-1-204'
      },
      {
        id: 2,
        name: 'kx',
        room: '3-5-502'
      }
    ];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '13fs',
      name: "lx",
      room: '2202'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = 1;
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(1);
  });

  it('should not remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(2);
  });

  it('should find a user', () => {
    var userId = 1;
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    var userId = '1';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  it('should return names for 1-1-204', () => {
    var userList = users.getUserList('1-1-204');

    expect(userList).toEqual(['lsh']);
  });

  it('should return names for 3-5-502', () => {
    var userList = users.getUserList('3-5-502');

    expect(userList).toEqual(['kx']);
  });

});
