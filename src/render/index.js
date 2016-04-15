/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {MDASTAnyNode, JSAST, JSASTFactory} from '../types';
import type {ComponentRef} from '../ComponentRef';
import type {RendererConfig} from './Renderer';

import * as build from 'babel-types';
import invariant from 'invariant';

import Renderer from './Renderer';
import buildJSON from './buildJSON';

type RenderPartsResult = {
  expression: JSAST;
  identifiersUsed: Array<JSAST>;
  metadata: ?JSON;
};

type DirectiveConfig = {
  [name: string]: ComponentRef | string;
};

type CompleteRenderConfig = {
  build: JSASTFactory;
  elements: DirectiveConfig;
  directives: DirectiveConfig;
};

export type RenderConfig = $Shape<CompleteRenderConfig>;

const defaultRendererConfig: RendererConfig = {
  build: build,
  elements: {},
  directives: {},
};

function element(name: string): ComponentRef {
  return {source: 'reactdown/lib/elements', name};
}

function directive(name: string): ComponentRef {
  return {source: `reactdown/lib/directives/${name}`, name: 'default'};
}

const defaultRenderConfig: CompleteRenderConfig = {
  build: build,
  elements: {
    'Root': 'div',
    'Unknown': element('Unknown'),
    'Paragraph': 'p',
    'Strikethrough': 'del',
    'Image': 'img',
    'Break': 'br',
    'Emphasis': 'em',
    'Strong': 'strong',
    'InlineCode': 'code',
    'Rule': 'hr',
    'HTML': element('HTML'),
    'Table': 'table',
    'TableBody': 'tbody',
    'TableHead': 'thead',
    'TableRow': 'tr',
    'TableHeaderCell': 'th',
    'TableCell': 'td',
    'Blockquote': 'blockquote',
    'Code': 'code',
    'Link': 'a',
    'ListItem': 'li',
    'OrderedList': 'ol',
    'UnorderedList': 'ul',
    'Heading1': 'h1',
    'Heading2': 'h2',
    'Heading3': 'h4',
    'Heading4': 'h4',
    'Heading5': 'h5',
    'Heading6': 'h6',
  },
  directives: {
    'meta': directive('meta'),
  },
};

function applyDefaultConfig<T: {directives: Object, elements: Object}>(config: T, defaultConfig: T): T {
  if (config !== defaultConfig) {
    config = {
      ...defaultConfig,
      ...config,
      directives: {
        ...defaultConfig.directives,
        ...config.directives,
      },
      elements: {
        ...defaultConfig.elements,
        ...config.elements,
      },
    };
  }
  return config;
}

function keyMirrorToJSAST(build, obj): {[name: string]: JSAST} {
  let result = {};
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      result[key] = build.stringLiteral(obj[key]);
    } else {
      result[key] = build.identifier(key);
    }
  }
  return result;
}

export function renderToProgram(
    node: MDASTAnyNode,
    config: RenderConfig = defaultRenderConfig): JSAST {
  config = applyDefaultConfig(config, defaultRenderConfig);
  let {build, elements, directives} = config;
  let rendererConfig = {
    build,
    elements: keyMirrorToJSAST(build, elements),
    directives: keyMirrorToJSAST(build, directives),
  };

  let {
    expression,
    identifiersUsed,
    metadata
  } = renderToParts(node, rendererConfig);

  expression = expr`
    React.createElement(DocumentContext, {context: {metadata}},
      ${expression})
  `;

  let statements = stmt`
    export default function Document() {
      return ${expression};
    }
    export let metadata = ${buildJSON(build, metadata)};
  `;

  identifiersUsed.forEach(identifier => {
    let spec = directives[identifier.name] || elements[identifier.name];
    invariant(
      spec !== undefined,
      'Cannot resolve identifier to spec'
    );
    if (typeof spec === 'string') {
      return;
    }
    if (spec.name === 'default') {
      statements.unshift(
        stmt`import ${identifier} from "${build.stringLiteral(spec.source)}"`
      );
    } else {
      statements.unshift(
        stmt`import { ${build.identifier(spec.name)} as ${identifier} } from "${build.stringLiteral(spec.source)}"`
      );
    }
  });

  statements = stmt`
    import React from "react";
    import DocumentContext from "reactdown/lib/DocumentContext";
  `.concat(statements);

  return build.program(statements);
}

export function renderToParts(
    node: MDASTAnyNode,
    config: RendererConfig = defaultRendererConfig): RenderPartsResult {
  config = applyDefaultConfig(config, defaultRendererConfig);
  let renderer = new Renderer(config);
  renderer.render(node);
  invariant(
    renderer.expression != null,
    'Renderer should result in a not null expression after render() call'
  );
  return {
    expression: renderer.expression,
    identifiersUsed: renderer.identifiersUsed,
    metadata: renderer.metadata,
  };
}
