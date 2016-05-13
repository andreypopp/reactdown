/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {JSON, JSAST} from '../types';

import * as build from 'babel-types';

export type Buildable
  = JSON
  | {toJSAST(): JSAST};

export default function buildJSON(value: Buildable): JSAST {
  if (value && typeof value.toJSAST === 'function') {
    return value.toJSAST(build);
  } else if (build.isNode(value)) {
    return value;
  } else if (value === undefined) {
    return build.identifier('undefined');
  } else if (value === null) {
    return build.nullLiteral();
  } else if (typeof value === 'string') {
    return build.stringLiteral(value);
  } else if (typeof value === 'number') {
    return build.numericLiteral(value);
  } else if (typeof value === 'boolean') {
    return build.booleanLiteral(value);
  } else if (value instanceof Date) {
    return build.stringLiteral(value.toISOString());
  } else if (Array.isArray(value)) {
    return build.arrayExpression(value.map(item =>
      buildJSON(item)));
  } else if (typeof value === 'object') {
    let properties = [];
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        properties.push(
          build.objectProperty(
            build.stringLiteral(key),
            buildJSON(value[key])
          )
        );
      }
    }
    return build.objectExpression(properties);
  } else {
    throw new Error('cannot parse value to AST: ' + value);
  }
}
