/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {MDASTRootNode} from '../types';
import nodeToString from 'mdast-util-to-string';

export default function title(node: MDASTRootNode): ?string {
  for (let i = 0; i < node.children.length; i++) {
    let child = node.children[i];
    if (child.type === 'heading') {
      if (child.depth === 1) {
        return nodeToString(child);
      }
    }
  }
  return null;
}
