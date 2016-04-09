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
import buildImport from './buildImport';
import buildJSON from './buildJSON';
import buildReactElement from './buildReactElement';

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
    'root': 'div',
    'unknown': element('unknown'),
    'paragraph': 'p',
    'strikethrough': 'del',
    'image': 'img',
    'break': 'br',
    'emphasis': 'em',
    'strong': 'strong',
    'inlineCode': 'code',
    'rule': 'hr',
    'html': element('html'),
    'table': 'table',
    'tableBody': 'tbody',
    'tableHead': 'thead',
    'tableRow': 'tr',
    'tableHeaderCell': 'th',
    'tableCell': 'td',
    'blockquote': 'blockquote',
    'code': element('code'),
    'link': 'a',
    'listItem': 'li',
    'list': element('list'),
    'heading': element('heading'),
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

  expression = buildReactElement(
    build,
    build.identifier('DocumentContext'),
    {context: {metadata: build.identifier('metadata')}},
    expression
  );

  let statements = [
    build.exportDefaultDeclaration(
      build.functionDeclaration(
        build.identifier('Document'),
        [],
        build.blockStatement([build.returnStatement(expression)])
      )
    ),
    build.exportNamedDeclaration(
      build.variableDeclaration(
        'let',
        [build.variableDeclarator(
          build.identifier('metadata'),
          buildJSON(build, metadata))]
      ),
      [],
      null
    )
  ];

  identifiersUsed.forEach(identifier => {
    let spec = directives[identifier.name] || elements[identifier.name];
    invariant(
      spec !== undefined,
      'Cannot resolve identifier to spec'
    );
    if (typeof spec === 'string') {
      return;
    }
    statements.unshift(
      buildImport(build, spec.source, identifier.name, spec.name)
    );
  });

  statements.unshift(
    buildImport(build, 'reactdown/lib/DocumentContext', 'DocumentContext')
  );

  statements.unshift(
    buildImport(build, 'react', 'React')
  );

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
