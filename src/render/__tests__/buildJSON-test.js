/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import generate from 'babel-generator';
import * as build from 'babel-types';
import buildJSON from '../buildJSON';

function render(value) {
  return generate(buildJSON(value)).code;
}

class Custom {
  toJSAST(build) {
    return build.identifier('Custom');
  }
}

it('builds via toJSAST() call', function() {
  expect(render(new Custom())).toEqual('Custom');
});

it('builds JSAST nodes', function() {
  expect(render(build.identifier('ok'))).toEqual('ok');
});

it('builds null', function() {
  expect(render(null)).toEqual('null');
});

it('builds strings', function() {
  expect(render('some string')).toEqual('"some string"');
});

it('builds numbers', function() {
  expect(render(42)).toEqual('42');
});

it('builds booleans', function() {
  expect(render(true)).toEqual('true');
  expect(render(false)).toEqual('false');
});

it('builds arrays', function() {
  expect(render([1, 'x'])).toEqual('[1, "x"]');
});

it('builds objects', function() {
  expect(render({a: 42, b: ['x']})).toEqual('{\n  "a": 42,\n  "b": ["x"]\n}');
});
