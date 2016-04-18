/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {MDASTRootNode, MDASTHeadingNode, MDASTAnyNode} from '../types';

import visit from 'unist-util-visit';

export default function toc(node: MDASTRootNode) {
  let toc: Array<{value: string; depth: number}> = [];
  visit(node, 'heading', (node: MDASTHeadingNode) => {
    let value = '';
    visit(node, (node: MDASTAnyNode) => {
      if (node.value) {
        value = value + node.value;
      }
    });
    toc.push({value, depth: node.depth});
  });
  return toc;
}
