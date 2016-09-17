/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import {parse, parseNamed} from '../CodeRef';

function generateCases(func, cases: any) {
  cases.forEach(c => {
    let {input, expectation} = c;
    it(`handles "${input}"`, function() {
      expect(func(input)).toEqual(expectation);
    });
  });
}

describe('parse()', function() {

  generateCases(parse, [
    {
      input: 'module',
      expectation: {source: 'module', name: 'default'}
    },
    {
      input: 'module?',
      expectation: null
    },
    {
      input: 'module?name',
      expectation: {source: 'module', name: 'name'}
    },
    {
      input: './module/lib?name',
      expectation: {source: './module/lib', name: 'name'}
    },
    {
      input: '?name',
      expectation: null
    },
  ]);

});

describe('parseNamed()', function() {

  generateCases(parseNamed, [
    {
      input: 'module',
      expectation: null
    },
    {
      input: 'module.',
      expectation: null
    },
    {
      input: 'module?name',
      expectation: null
    },
    {
      input: 'id=module',
      expectation: {id: 'id', ref: {source: 'module', name: 'default'}}
    },
    {
      input: 'id=module?name',
      expectation: {id: 'id', ref: {source: 'module', name: 'name'}}
    },
    {
      input: 'id=?name',
      expectation: null
    },
    {
      input: 'id=module?',
      expectation: null
    },
  ]);
});
