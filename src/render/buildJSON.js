/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {JSAST, JSASTFactory} from '../types';

type JSON
  = null
  | string
  | number
  | boolean
  | Array<JSON>
  | {[key: string]: JSON};

export default function buildJSON(build: JSASTFactory, value: JSON): JSAST {
  if (value === undefined) {
    return build.identifier('undefined');
  } else if (value === null) {
    return build.nullLiteral();
  } else if (typeof value === 'string') {
    return build.stringLiteral(value);
  } else if (typeof value === 'number') {
    return build.numericLiteral(value);
  } else if (typeof value === 'boolean') {
    return build.booleanLiteral(value);
  } else if (Array.isArray(value)) {
    return build.arrayExpression(value.map(item =>
      buildJSON(build, item)));
  } else if (typeof value === 'object') {
    let properties = [];
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        properties.push(
          build.objectProperty(
            build.stringLiteral(key),
            buildJSON(build, value[key])
          )
        );
      }
    }
    return build.objectExpression(properties);
  } else {
    throw new Error('cannot parse value to AST: ' + value);
  }
}
