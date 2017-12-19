const expect = require('expect');
const utils = require('./utils');

it('should add two numbers', () => {
  var res = utils.add(23, 4);
  expect(res).toBe(27).toBeA('number');
});

it('should square a number', () => {
  var res = utils.square(3);
  expect(res).toBe(9).toBeA('number');
});
