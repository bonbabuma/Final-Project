const assert = require('assert');
const operations = require('./operations.js')

it('correctly calculates the sum of 1 and 3', () => {
    assert.equal(operations.add('1', 3), 4);
  });
it('correctly calculates the difference of 1 and 3', () => {
    assert.equal(operations.subtract('1', 3), -2);
  });
it('correctly calculates the mult of 1 and 3', () => {
    assert.equal(operations.multiply('1', 3), 3);
  });
it('correctly calculates the div of 1 and 3', () => {
    assert.equal(operations.divide('1', 3), 1/3);
  });