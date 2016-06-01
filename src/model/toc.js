/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import visit from 'unist-util-visit';
import nodeToString from 'mdast-util-to-string';
import slug from 'slug';
import type {MDASTRootNode, MDASTHeadingNode} from '../types';

export default function toc(node: MDASTRootNode) {
  let toc: Array<{title: string; name: string; depth: number}> = [];
  visit(node, 'heading', (node: MDASTHeadingNode) => {
    let title = nodeToString(node);
    let name = slug(title);
    toc.push({title, name, depth: node.depth});
  });
  return toc;
}
