import * as cardsts from '../ts/index.cards.js'
import { describe } from 'mocha';
import { assert } from 'chai';

console.log(cardsts);
debugger
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
