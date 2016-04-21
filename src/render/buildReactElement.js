/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {JSON, JSAST, JSASTFactory} from '../types';
import buildJSON from './buildJSON';

export default function buildReactElement(
    build: JSASTFactory,
    name: JSAST,
    props: JSON,
    ...children: Array<JSAST>
  ) {
  let createElement = expr`React.createElement`;
  return build.callExpression(
    createElement,
    [name, buildJSON(build, props), ...children]
  );
}
