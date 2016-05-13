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
      return generate(buildJSON(value)).code;
    }

    class Custom {
      toJSAST(build) {
        return build.identifier('Custom');
      }
    }

    it('builds via toJSAST() call', function() {
      assert.equal(render(new Custom()), 'Custom');
    });

    it('builds JSAST nodes', function() {
      assert.equal(render(build.identifier('ok')), 'ok');
    });

    it('builds null', function() {
      assert.equal(render(null), 'null');
    });

    it('builds strings', function() {
      assert.equal(render('some string'), '"some string"');
    });

    it('builds numbers', function() {
      assert.equal(render(42), '42');
    });

    it('builds booleans', function() {
      assert.equal(render(true), 'true');
      assert.equal(render(false), 'false');
    });

    it('builds arrays', function() {
      assert.equal(render([1, 'x']), '[1, "x"]');
    });

    it('builds objects', function() {
      assert.equal(render({a: 42, b: ['x']}), '{\n  "a": 42,\n  "b": ["x"]\n}');
    });

  });

});
