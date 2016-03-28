/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 */

const CUSTOM_BLOCK_TEST = /^::[a-zA-Z]+\s*\n/;
const CUSTOM_BLOCK_INDENT = 2;
const CUSTOM_BLOCK_TYPE = 'customBlock';
const NEWLINE = '\n';

function parseCustomBlock(eat, value) {

  // Get next line and shift value.
  function nextLine() {
    let index = value.indexOf('\n');
    if (index === -1) {
      return null;
    }
    let line = value.slice(0, index);
    value = value.slice(index + 1);
    return line;
  }

  function eatLine(line) {
    eat(line);
    eat('\n');
  }

  let position = eat.now();

  // Smoke test for custom block.
  let match = CUSTOM_BLOCK_TEST.exec(value);
  if (!CUSTOM_BLOCK_TEST.exec(value)) {
    return;
  }

  let indent = position.column - 1 + CUSTOM_BLOCK_INDENT;

  // ::CustomBlockName
  let bannerLine = nextLine().trim();
  let name = bannerLine.slice(2);

  eatLine(bannerLine);

  let childrenPosition = eat.now();

  let currentLine = nextLine();
  let children = [];

  while (currentLine !== null) {
    if (currentLine === '') {
      eatLine(currentLine);
      children.push(NEWLINE);
    } else if (hasIndent(currentLine, indent)) {
      eatLine(currentLine);
      children.push(currentLine.slice(indent));
    } else {
      break;
    }
    currentLine = nextLine();
  }

  if (children.length > 0) {
    children = children.join(NEWLINE);
    children = this.tokenizeBlock(children, childrenPosition);
  }

  eat('')({
    type: CUSTOM_BLOCK_TYPE,
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

export default function customBlock(remark) {

  let ParserPrototype = remark.Parser.prototype;

  ParserPrototype.blockTokenizers.customBlock = parseCustomBlock;
  ParserPrototype.blockMethods.splice(
    ParserPrototype.blockMethods.indexOf('fences') + 1, 0, 'customBlock');
}
