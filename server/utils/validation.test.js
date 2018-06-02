const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject mon-string values', () => {
    var res = isRealString(9);
    expect(res).toBe(false);
  });

  it('should reject string width only space', () => {
    var res = isRealString('   ');
    expect(res).toBe(false);
  });

  it('should allow string width non-space characters', () =>  {
    var res = isRealString('lsh');
    expect(res).toBe(true);
  });
});
