const expect = require('expect');
const utils = require('./utils');

describe('Utils', () => {
  describe('#add', () => {
  it('should add two numbers', () => {
    var res = utils.add(23, 4);
    expect(res).toBe(27).toBeA('number');
  });
});

it('should square a number', () => {
  var res = utils.square(3);
  expect(res).toBe(9).toBeA('number');
});

// should verify first and last names are set
// assert it includes firstName and lastName with proper values
it('should set firstName and lastName', () => {
  var  user = {location: 'Beijing', age: 23};
  var res = utils.setName(user, "Andrew lsh");

  expect(user).toInclude({
    firstName: 'Andrew',
    lastName: 'lsh'
    });
  })
});

// it('should expect some values', () => {l
//   // expect(12).toNotBe(12);
//   // expect({name: 'Andrew'}).toNotEqual({name: 'Andrew'});
//   // expect([2,3,4]).toExclude(1);
//   expect({
//     name: 'Andrew',
//     age: 23,
//     location: 'beijing'
//   }).toExclude({
//     age: 22
//   })
// });
