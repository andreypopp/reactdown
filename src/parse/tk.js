/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {Eat} from './types';

const TK_TEST = /^TK\s+([^\n]+)\n/;

function parseTK(eat: Eat, value: string): void {
  let match = TK_TEST.exec(value);

  if (!match) {
    return;
  }

  let [wholeLine, line] = match;
  eat(wholeLine)({
    type: 'directive',
    position: null,
    name: 'TK',
    line,
    children: [],
    value: null,
    data: null
  });
}

export default function tk() {

  return function(remark: any) {

    let ParserPrototype = remark.Parser.prototype;

    ParserPrototype.blockTokenizers.tk = parseTK;
    ParserPrototype.blockMethods.splice(
      ParserPrototype.blockMethods.indexOf('fences') + 1, 0, 'tk');
  };
}

