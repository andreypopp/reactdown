/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {JSON, JSAST} from '../types';

import * as build from 'babel-types';
import buildJSON from './buildJSON';

export default function buildReactElement(
    name: JSAST,
    props: JSON,
    ...children: Array<JSAST>
  ) {
  let createElement = expr`React.createElement`;
  return build.callExpression(
    createElement,
    [name, buildJSON(props), ...children]
  );
}
