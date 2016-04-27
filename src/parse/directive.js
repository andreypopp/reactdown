/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import jsYAML from 'js-yaml';
import type {MDASTAnyNode} from '../types';
import type {NodeSpec, Node} from '../schema';
import type {Eat} from './types';

import {
  parse as parseSchema,
  validate as validateSchema,
  any
} from '../schema';
import {
  mapValue,
  hasIndent
} from '../utils';

export type CompleteDirectiveConfig = {
  line: null
      | 'required'
      | 'optional';
  children: null
          | 'required'
          | 'required-preformatted'
          | 'optional'
          | 'optional-preformatted',
  data: ?NodeSpec;
};

export type DirectiveConfig = $Shape<CompleteDirectiveConfig>;

export type DirectiveMapping = {
  [name: string]: DirectiveConfig;
};

type NormalizedDirectiveConfig = {
  lineAllowed: boolean;
  lineRequired: boolean;
  childrenAllowed: boolean;
  childrenRequired: boolean;
  childrenPreformatted: boolean;
  dataAllowed: boolean;
  dataSchema: ?Node;
};

type NormalizedDirectiveMapping = {
  [name: string]: NormalizedDirectiveConfig;
};

const CUSTOM_BLOCK_TEST = /^\.\.([a-zA-Z]+) *([^\n]*)?\n/;
const CUSTOM_BLOCK_INDENT = 2;
const TRIPLE_DASH = '---';
const NEWLINE = '\n';

const defautlDirectiveConfig: NormalizedDirectiveConfig = {
  lineAllowed: false,
  lineRequired: false,
  childrenAllowed: false,
  childrenRequired: false,
  childrenPreformatted: false,
  dataAllowed: false,
  dataSchema: null,
};

function normalizeDirectiveConfig(directive: DirectiveConfig): NormalizedDirectiveConfig {
  let {line, children, data} = directive;
  return {
    lineAllowed: line != null,
    lineRequired: line === 'required',
    childrenAllowed: children != null,
    childrenRequired: (
      children  === 'required' ||
      children === 'required-preformatted'
    ),
    childrenPreformatted: (
      children  === 'required-preformatted' ||
      children === 'optional-preformatted'
    ),
    dataAllowed: data != null,
    dataSchema: data ? parseSchema(data) : any,
  };
}

function parseDirective(directives: NormalizedDirectiveMapping, eat: Eat, value: string): void {

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

  if (directives[name] === undefined) {
    eat.file.fail(
      `Found unknown directive ..${name}`,
      eat.now()
    );
  }

  let config = {...defautlDirectiveConfig, ...directives[name]};

  if (line && !config.lineAllowed) {
    eat.file.fail(
      `Found an unexpected line value while parsing ..${name} directive`,
      eat.now()
    );
  } else if (!line && config.lineRequired) {
    eat.file.fail(
      `Line value required but not found while parsing ..${name} directive`,
      eat.now()
    );
  }

  eatLine(bannerLine);

  let childrenPosition = eat.now();

  let currentLine = nextLine();
  let content = [];
  let dataContent = [];

  if (
    currentLine !== null &&
    hasIndent(currentLine, CUSTOM_BLOCK_INDENT) &&
    currentLine.trim() === TRIPLE_DASH
  ) {
    if (!config.dataAllowed) {
      eat.file.fail(
        `Found an unexpected data value while parsing ..${name} directive`,
        eat.now()
      );
    }
    eatLine(currentLine);
    currentLine = nextLine();
    while (currentLine !== null) {
      if (currentLine === '') {
        eatLine(currentLine);
        dataContent.push(currentLine);
      } else if (hasIndent(currentLine, CUSTOM_BLOCK_INDENT)) {
        eatLine(currentLine);
        if (currentLine.trim() === TRIPLE_DASH) {
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
             !isEmpty(content))
    ) {
      if (!config.childrenAllowed) {
        eat.file.fail(
          `Found an unexpected children value while parsing ..${name} directive`,
          eat.now()
        );
      }
      eatLine(currentLine);
      content.push(currentLine.slice(CUSTOM_BLOCK_INDENT));
    } else {
      break;
    }
    currentLine = nextLine();
  }

  let data = null;

  if (dataContent.length > 0) {
    dataContent = dataContent.join(NEWLINE);
    data = jsYAML.safeLoad(dataContent);
  }
  if (config.dataSchema) {
    //data = validateSchema(config.dataSchema, data);
  }

  let children: Array<MDASTAnyNode> = [];

  content = content.join(NEWLINE);

  if (content.length > 0) {
    if (!config.childrenAllowed && content.trim().length > 0) {
      eat.file.fail(
        `Found an unexpected children value while parsing ..${name} directive`,
        eat.now()
      );
    } else if (config.childrenPreformatted) {
      children = [{type: 'text', value: content.trim(), data: null, position: null}];
    } else {
      children = this.tokenizeBlock(content, childrenPosition);
    }
  } else {
    if (config.childrenRequired) {
      eat.file.fail(
        `Children value expected but not found while parsing ..${name} directive`,
        eat.now()
      );
    }
  }

  eat('')({
    type: 'directive',
    position: null,
    name, line, children, data
  });
}

function isEmpty(content) {
  return content.some(line => line !== '\n');
}

export default function directive(directives: DirectiveMapping = {}) {

  let normalizedDirectives = mapValue(directives, normalizeDirectiveConfig);

  return function(remark: any) {

    function directive(...args) {
      return parseDirective.call(this, normalizedDirectives, ...args);
    }

    let ParserPrototype = remark.Parser.prototype;

    ParserPrototype.blockTokenizers.directive = directive;
    ParserPrototype.blockMethods.splice(
      ParserPrototype.blockMethods.indexOf('fences') + 1, 0, 'directive');
  };
}
