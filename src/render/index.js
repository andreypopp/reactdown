/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {MDASTAnyNode, JSAST} from '../types';
import type {RendererConfig} from './Renderer';

import * as build from 'babel-types';
import invariant from 'invariant';
import Renderer from './Renderer';

const DEFAULT_RENDERER_CONFIG: RendererConfig = {
  build: build,
  markdownComponents: {},
  blockComponents: {},
};

type RenderResult = {
  expression: JSAST;
  identifiersUsed: Array<JSAST>;
};

export function renderToFile(
    node: MDASTAnyNode,
    config: RendererConfig = DEFAULT_RENDERER_CONFIG): JSAST {
  let {expression, identifiersUsed} = render(node, config);
  return expression;
}

export default function render(
    node: MDASTAnyNode,
    config: RendererConfig = DEFAULT_RENDERER_CONFIG): RenderResult {
  if (config !== DEFAULT_RENDERER_CONFIG) {
    config = {...DEFAULT_RENDERER_CONFIG, ...config};
  }
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
