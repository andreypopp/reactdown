/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import visit from 'unist-util-visit';
import nodeToString from 'mdast-util-to-string';
import type {MDASTRootNode, MDASTHeadingNode} from '../types';

export default function toc(node: MDASTRootNode) {
  let toc: Array<{value: ?string; depth: number}> = [];
  visit(node, 'heading', (node: MDASTHeadingNode) => {
    let value = nodeToString(node);
    toc.push({value, depth: node.depth});
  });
  return toc;
}
