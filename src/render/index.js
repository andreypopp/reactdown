/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {MDASTAnyNode, JSAST} from '../types';
import type {RendererConfig} from './Renderer';

import * as build from 'babel-types';
import invariant from 'invariant';

import Renderer from './Renderer';
import buildImport from './buildImport';

const DEFAULT_RENDERER_CONFIG: RendererConfig = {
  build: build,
  markdownComponents: {},
  directives: {},
};

type RenderResult = {
  expression: JSAST;
  identifiersUsed: Array<JSAST>;
};

function applyDefaults(config: RendererConfig): RendererConfig {
  if (config !== DEFAULT_RENDERER_CONFIG) {
    config = {...DEFAULT_RENDERER_CONFIG, ...config};
  }
  return config;
}

type CodeRef = {
  source: string;
  name: string;
};

type DirectiveConfig = {
  [name: string]: CodeRef;
};

export function renderToProgram(
    node: MDASTAnyNode,
    config: RendererConfig = DEFAULT_RENDERER_CONFIG): JSAST {
  config = applyDefaults(config);
  let build = config.build;
  let {expression, identifiersUsed} = render(node, config);
  let statements = [];
  return build.program(statements);
}

export default function render(
    node: MDASTAnyNode,
    config: RendererConfig = DEFAULT_RENDERER_CONFIG): RenderResult {
  config = applyDefaults(config);
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
