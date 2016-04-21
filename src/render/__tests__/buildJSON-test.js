/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import assert from 'assert';
import generate from 'babel-generator';
import * as build from 'babel-types';
import buildJSON from '../buildJSON';

declare function describe(description: string, body: any): void;
declare function it(description: string, body: any): void;

describe('reactdown/render', function() {

  describe('buildJSON', function() {

    function render(value) {
      return generate(buildJSON(build, value)).code;
    }

    it('parses null', function() {
      assert.equal(render(null), 'null');
    });

    it('parses strings', function() {
      assert.equal(render('some string'), '"some string"');
    });

    it('parses numbers', function() {
      assert.equal(render(42), '42');
    });

    it('parses booleans', function() {
      assert.equal(render(true), 'true');
      assert.equal(render(false), 'false');
    });

    it('parses arrays', function() {
      assert.equal(render([1, 'x']), '[1, "x"]');
    });

    it('parses objects', function() {
      assert.equal(render({a: 42, b: ['x']}), '{\n  "a": 42,\n  "b": ["x"]\n}');
    });

  });

});
