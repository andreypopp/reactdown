/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

const CUSTOM_BLOCK_TEST = /^::[a-zA-Z]+\s*\n/;
const CUSTOM_BLOCK_INDENT = 2;
const NEWLINE = '\n';

import type {MDASTAnyNode} from '../types';

type ProduceNode = (node: MDASTAnyNode) => void;
type Eat = (value: string) => ProduceNode;

function parseCustomBlock(eat: Eat, value: string): void {

  // Get next line and shift value.
  function nextLine() {
    if (value.length === 0) {
      return null;
    }
    let line;
    let index = value.indexOf('\n');
    if (index > -1) {
      line = value.slice(0, index);
      value = value.slice(index + 1);
    } else {
      line = value;
      value = '';
    }
    return line;
  }

  function eatLine(line) {
    eat(line);
    if (value !== '') {
      eat('\n');
    }
  }

  // Smoke test for custom block.
  if (!CUSTOM_BLOCK_TEST.exec(value)) {
    return;
  }

  // ::CustomBlockName
  let bannerLine = nextLine();
  if (bannerLine === null) {
    return;
  }
  let name = bannerLine.trim().slice(2);

  eatLine(bannerLine);

  let childrenPosition = eat.now();

  let currentLine = nextLine();
  let content = [];

  while (currentLine !== null) {
    if (currentLine === '') {
      eatLine(currentLine);
      content.push(NEWLINE);
    } else if (hasIndent(currentLine, CUSTOM_BLOCK_INDENT)) {
      eatLine(currentLine);
      content.push(currentLine.slice(CUSTOM_BLOCK_INDENT));
    } else {
      break;
    }
    currentLine = nextLine();
  }

  let children: Array<MDASTAnyNode> = [];

  if (content.length > 0) {
    content = content.join(NEWLINE);
    children = this.tokenizeBlock(content, childrenPosition);
  }

  eat('')({
    type: 'customBlock',
    position: null,
    name,
    children,
  });
}

function hasIndent(line, size) {
  for (let i = 0; i < size; i++) {
    if (line.charAt(i) !== ' ') {
      return false;
    }
  }
  return true;
}

export default function customBlock(remark: any) {

  let ParserPrototype = remark.Parser.prototype;

  ParserPrototype.blockTokenizers.customBlock = parseCustomBlock;
  ParserPrototype.blockMethods.splice(
    ParserPrototype.blockMethods.indexOf('fences') + 1, 0, 'customBlock');
}
