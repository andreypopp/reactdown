/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {MDASTAnyNode, JSAST} from '../types';
import type {RendererConfig} from './Renderer';

import * as DEFAULT_TYPES from 'babel-types';
import invariant from 'invariant';
import Renderer from './Renderer';

const DEFAULT_RENDERER_CONFIG: RendererConfig = {
  types: DEFAULT_TYPES,
  markdownComponents: {},
  blockComponents: {},
};

type RenderResult = {
  expression: JSAST;
  identifiersUsed: Array<JSAST>;
};

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
