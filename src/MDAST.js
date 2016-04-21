/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {MDASTAnyNode} from './types';
import visit from 'unist-util-visit';

export function renderNodeValue(node: MDASTAnyNode): ?string {
  let value = null;
  visit(node, (node: MDASTAnyNode) => {
    if (node.value) {
      value = value || '';
      value = value + node.value;
    }
  });
  return value;
}
