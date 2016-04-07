/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {MDASTAnyNode, JSAST, JSASTFactory} from '../types';
import type {RendererConfig} from './Renderer';

import * as build from 'babel-types';
import invariant from 'invariant';

import Renderer from './Renderer';
import buildImport from './buildImport';

type RenderPartsResult = {
  expression: JSAST;
  identifiersUsed: Array<JSAST>;
};

type CodeRef = {
  source: string;
  name: string;
};

type DirectiveConfig = {
  [name: string]: CodeRef;
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

const defaultRenderConfig: CompleteRenderConfig = {
  build: build,
  elements: {},
  directives: {},
};

function applyDefaultConfig<T>(config: T, defaultConfig: T): T {
  if (config !== defaultConfig) {
    config = {...defaultConfig, ...config};
  }
  return config;
}

function keyMirrorToJSAST(build, obj): {[name: string]: JSAST} {
  let result = {};
  for (let key in obj) {
    result[key] = build.identifier(key);
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
  let {expression, identifiersUsed} = renderToParts(node, rendererConfig);
  let statements = [
    build.exportDefaultDeclaration(
      build.functionDeclaration(
        build.identifier('Document'),
        [],
        build.blockStatement([build.returnStatement(expression)])
      )
    )
  ];
  identifiersUsed.forEach(identifier => {
    statements.unshift(
      buildImport(
        build,
        directives[identifier.name].source,
        identifier.name,
        directives[identifier.name].name
      )
    );
  });
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
  };
}
