/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {Node} from 'validated/schema';
import {expr} from 'babel-plugin-ast-literal/api';

import path from 'path';
import * as types from 'babel-types';
import {oneOf, object, string, maybe} from 'validated/schema';

// TODO: More robust regexpes required!
const PARSE_REF_RE = /^([a-zA-Z0-9\._\-\/]+)(\?([a-zA-Z0-9_]+))?$/;
const PARSE_NAMED_REF_RE = /^([a-zA-Z0-9_]+)=([a-zA-Z0-9_\.\-\/]+)(\?([a-zA-Z0-9_]+))?$/;

export type CodeRef = {
  source: string;
  name: ?string;
};

export class TaggedCodeRef {

  source: string;
  name: ?string;

  constructor(source: string, name: ?string) {
    this.source = source;
    this.name = name;
  }

  toJSAST() {
    let res = expr`require("${this.source}")`;
    if (this.name != null) {
      res = expr`${res}.${types.identifier(this.name)}`;
    }
    return res;
  }
}

export function parse(ref: string): ?CodeRef {
  let match = PARSE_REF_RE.exec(ref);
  if (!match) {
    return null;
  }
  let [_everything, source, _nothing, name = 'default'] = match;
  return new TaggedCodeRef(source, name);
}

export function parseNamed(ref: string): ?{id: string; ref: CodeRef} {
  let match = PARSE_NAMED_REF_RE.exec(ref);
  if (!match) {
    return null;
  }
  let [_everything, id, source, _nothing, name = 'default'] = match;
  return {id, ref: new TaggedCodeRef(source, name)};
}

export function resolve(ref: string | ?CodeRef): any {
  if (typeof ref === 'string') {
    ref = parse(ref);
  }
  if (ref == null) {
    return null;
  }
  // $FlowIssue: not a flow issue, we are just being smart here
  return require(ref.source)[ref.name];
}

export function relativeTo(ref: string | ?CodeRef, basedir: ?string): ?CodeRef {
  if (typeof ref === 'string') {
    ref = parse(ref);
  }
  if (ref == null) {
    return null;
  } else if (basedir == null || ref.source[0] !== '.') {
    return ref;
  } else {
    return new TaggedCodeRef(path.resolve(basedir, ref.source), ref.name);
  }
}

export function schema(basedir: ?string = null): Node {
  return oneOf(
    object({
      source: string,
      name: maybe(string).andThen(value => value == null ? 'default' : value),
    }),
    string.andThen((value, context) => {
      let ref = parse(value);
      if (ref === null) {
        context.error(`Expected a code ref but found "${value}"`);
      }
      return ref;
    })
  ).andThen(ref => relativeTo(ref, basedir));
}
