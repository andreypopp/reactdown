/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import assert from 'assert';
import {parse, parseNamed} from '../ComponentRef';

declare function describe(description: string, body: any): void;
declare function it(description: string, body: any): void;

describe('reactdown', function() {

  describe('ComponentRef', function() {

    function generateCases(func, cases: any) {
      cases.forEach(c => {
        let {input, expectation} = c;
        it(`handles "${input}"`, function() {
          assert.deepEqual(func(input), expectation);
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

  });

});
