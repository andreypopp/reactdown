/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import * as babelTypes from 'babel-types';
import type {JSAST} from '../types';

type JSON
  = null
  | string
  | number
  | boolean
  | Array<JSON>
  | {[key: string]: JSON};

export default function parseJSON(value: JSON, types = babelTypes): JSAST {
  if (value === undefined) {
    return types.identifier('undefined');
  } else if (value === null) {
    return types.nullLiteral();
  } else if (typeof value === 'string') {
    return types.stringLiteral(value);
  } else if (typeof value === 'number') {
    return types.numericLiteral(value);
  } else if (typeof value === 'boolean') {
    return types.booleanLiteral(value);
  } else if (Array.isArray(value)) {
    return types.arrayExpression(value.map(item =>
      parseJSON(item, types)));
  } else if (typeof value === 'object') {
    let properties = [];
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        properties.push(
          types.objectProperty(
            types.stringLiteral(key),
            parseJSON(value[key], types)
          )
        );
      }
    }
    return types.objectExpression(properties);
  } else {
    throw new Error('cannot parse value to AST: ' + value);
  }
}
