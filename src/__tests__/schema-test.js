/**
 * @copyright 2016-present, Reactdown team
 */

import assert from 'assert';
import {
  validate,
  mapping, object, sequence, maybe, oneOf,
  string, number, any
} from '../schema';

function assertSuccess(schema, value, expectedValue) {
  assert.deepStrictEqual(validate(schema, value), expectedValue);
}

function assertFailure(schema, value, message) {
  assert.throws(() => validate(schema, value), message);
}

function itSuccess(description, schema, value, expectedValue) {
  description = `validates ${description}`;
  it(description, () => assertSuccess(schema, value, expectedValue));
}

function itFailure(description, schema, value, message) {
  it(description, () => assertFailure(schema, value, message));
}

describe('reactdown/schema', function() {

  describe('mapping', function() {
    let basicSchema = mapping(any);
    itSuccess('{}', basicSchema, {}, {});
    itSuccess('{a: 1}', basicSchema, {a: 1}, {a: 1});
    itSuccess('{a: 1, b: 2}', basicSchema, {a: 1, b: 2}, {a: 1, b: 2});
    itFailure('does not validate Array', basicSchema, []);
    itFailure('does not validate null', basicSchema, null);
    itFailure('does not validate undefined', basicSchema, undefined);
    itFailure('does not validate Number', basicSchema, 1);
    itFailure('does not validate Boolean', basicSchema, true);
    itFailure('does not validate String', basicSchema, 'not ok');
    let restrictedSchema = mapping(string);
    itSuccess('{}', restrictedSchema, {}, {});
    itSuccess('{a: "ok"}', restrictedSchema, {a: 'ok'}, {a: 'ok'});
    itFailure('does not validate {a: 42}', restrictedSchema, {a: 42});
  });

  describe('object', function() {
    describe('with fields', function() {
      let schema = object({a: any, b: any});
      itSuccess('{a: 1, b: 2}', schema, {a: 1, b: 2}, {a: 1, b: 2});
      itFailure('{a: 1}', schema, {a: 1});
      itFailure('{b: 1}', schema, {b: 1});
      itFailure('{}', schema, {});
      itFailure('{c: 3}', schema, {c: 3});
      itFailure('{a: 1, b: 2, c: 3}', schema, {a: 1, b: 2, c: 3});
      itFailure('does not validate Array', schema, []);
      itFailure('does not validate null', schema, null);
      itFailure('does not validate undefined', schema, undefined);
      itFailure('does not validate Number', schema, 1);
      itFailure('does not validate Boolean', schema, true);
      itFailure('does not validate String', schema, 'not ok');
    });

    describe('with fields with specific validator', function() {
      let schema = object({a: string, b: string});
      itSuccess('{a: "a", b: "b"}', schema, {a: 'a', b: 'b'}, {a: 'a', b: 'b'});
      itFailure('{a: 1, b: 2}', schema, {a: 1});
    });

    describe('with fields defaults', function() {
      let schema = object({a: string, b: string}, {a: 'ok'});
      itSuccess('{a: "a", b: "b"}', schema, {a: 'a', b: 'b'}, {a: 'a', b: 'b'});
      itSuccess('{b: "b"}', schema, {b: 'b'}, {a: 'ok', b: 'b'});
    });

  });

  describe('sequence', function() {
    let basicSchema = sequence(any);
    itSuccess('[]', basicSchema, [], []);
    itSuccess('[42]', basicSchema, [42], [42]);
    itSuccess('[42, 43]', basicSchema, [42, 43], [42, 43]);
    itFailure('does not validate Object', basicSchema, {});
    itFailure('does not validate null', basicSchema, null);
    itFailure('does not validate undefined', basicSchema, undefined);
    itFailure('does not validate Number', basicSchema, 1);
    itFailure('does not validate Boolean', basicSchema, true);
    itFailure('does not validate String', basicSchema, 'not ok');
    let restrictedSchema = sequence(string);
    itSuccess('[]', restrictedSchema, [], []);
    itSuccess('["ok"]', restrictedSchema, ['ok'], ['ok']);
    itFailure('does not validate [42]', restrictedSchema, [42]);
  });

  describe('oneOf', function() {

    describe('with scalars', function() {
      let schema = oneOf(string, number);
      itSuccess('Number', schema, 1, 1);
      itSuccess('String', schema, 'ok', 'ok');
      itFailure('Boolean', schema, true);
      itFailure('Object', schema, {});
    });

    describe('with containers', function() {
      let schema = oneOf(object({a: number}), object({a: string}));
      itSuccess('Object {a: number}', schema, {a: 1}, {a: 1});
      itSuccess('Object {a: string}', schema, {a: 'ok'}, {a: 'ok'});
      itFailure('Object {a: boolean}', schema, {a: true});
    });

  });

  describe('maybe', function() {
    let schema = maybe(string);
    itSuccess('null', schema, null, null);
    itSuccess('undefined', schema, undefined, null);
    itSuccess('String', schema, 'not ok', 'not ok');
    itFailure('does not validate Number', schema, 1);
  });

});
