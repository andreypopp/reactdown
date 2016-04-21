/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {MDASTRootNode, MDASTHeadingNode} from '../types';
import {renderNodeValue} from '../MDAST';

export default function title(node: MDASTRootNode) {
  for (let i = 0; i < node.children.length; i++) {
    let child = node.children[i];
    if (child.type === 'heading') {
      // $FlowIssue: https://github.com/facebook/flow/issues/1689
      let heading: MDASTHeadingNode = child;
      if (heading.depth === 1) {
        return renderNodeValue(child);
      }
    }
  }
  return null;
}
