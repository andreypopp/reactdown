/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

const CUSTOM_BLOCK_TEST = /^\.\.([a-zA-Z]+) *([^\n]*)?\n/;
const CUSTOM_BLOCK_INDENT = 2;
const NEWLINE = '\n';

import jsYAML from 'js-yaml';
import type {MDASTAnyNode} from '../types';

type ProduceNode = (node: MDASTAnyNode) => void;
type Eat = (value: string) => ProduceNode;

export type CompleteDirectiveConfig = {
  preformatted: ?boolean;
};

export type DirectiveConfig = $Shape<CompleteDirectiveConfig>;

export type DirectiveMapping = {
  [name: string]: DirectiveConfig;
};

const defautlDirectiveConfig: CompleteDirectiveConfig = {
  preformatted: false,
};

function parseDirective(directives: DirectiveMapping, eat: Eat, value: string): void {

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

  let match = CUSTOM_BLOCK_TEST.exec(value);

  if (!match) {
    return;
  }

  // ..DirectiveName
  let bannerLine = nextLine();
  if (bannerLine === null) {
    return;
  }
  let [_, name, line = null] = match;

  let config = {...defautlDirectiveConfig, ...directives[name]};
  let preformatted = config.preformatted;

  eatLine(bannerLine);

  let childrenPosition = eat.now();

  let currentLine = nextLine();
  let content = [];
  let dataContent = [];

  if (
    currentLine !== null &&
    hasIndent(currentLine, CUSTOM_BLOCK_INDENT) &&
    currentLine.trim() === '---'
  ) {
    eatLine(currentLine);
    currentLine = nextLine();
    while (currentLine !== null) {
      if (currentLine === '') {
        eatLine(currentLine);
        dataContent.push(currentLine);
      } else if (hasIndent(currentLine, CUSTOM_BLOCK_INDENT)) {
        eatLine(currentLine);
        if (currentLine.trim() === '---') {
          currentLine = nextLine();
          break;
        } else {
          dataContent.push(currentLine.slice(CUSTOM_BLOCK_INDENT));
        }
      } else {
        break;
      }
      currentLine = nextLine();
    }
  }

  while (currentLine !== null) {
    if (currentLine === '') {
      eatLine(currentLine);
      content.push(NEWLINE);
    } else if (
        hasIndent(currentLine, CUSTOM_BLOCK_INDENT)
        && !(hasIndent(currentLine, 4) &&
             !hasIndent(currentLine, 5) &&
             !content.some(line => line !== '\n'))
    ) {
      eatLine(currentLine);
      content.push(currentLine.slice(CUSTOM_BLOCK_INDENT));
    } else {
      break;
    }
    currentLine = nextLine();
  }

  let children: Array<MDASTAnyNode> = [];
  let data = null;

  if (dataContent.length > 0) {
    dataContent = dataContent.join(NEWLINE);
    data = jsYAML.safeLoad(dataContent);
  }

  content = content.join(NEWLINE);
  if (content.length > 0 && !preformatted) {
    children = this.tokenizeBlock(content, childrenPosition);
  }

  eat('')({
    type: 'directive',
    position: null,
    name,
    line: line ? line.trim() : line,
    children: preformatted ? undefined : children,
    value: preformatted ? content.trim() : undefined,
    data,
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

export default function directive(directives: DirectiveMapping = {}) {

  return function(remark: any) {

    function directive(...args) {
      return parseDirective.call(this, directives, ...args);
    }

    let ParserPrototype = remark.Parser.prototype;

    ParserPrototype.blockTokenizers.directive = directive;
    ParserPrototype.blockMethods.splice(
      ParserPrototype.blockMethods.indexOf('fences') + 1, 0, 'directive');
  };
}
