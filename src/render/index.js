/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {MDASTAnyNode, JSAST} from '../types';
import type {RendererConfig} from './Renderer';

import * as DEFAULT_TYPES from 'babel-types';
import Renderer from './Renderer';

const DEFAULT_RENDERER_CONFIG = {
  components: {},
  types: DEFAULT_TYPES,
};

type RenderResult = {
  expression: JSAST;
  identifiersUsed: Array<JSAST>;
};

export default function render(
    node: MDASTAnyNode,
    config: RendererConfig = DEFAULT_RENDERER_CONFIG): RenderResult {
  let renderer = new Renderer(config);
  renderer.render(node);
  invariant(renderer.expression != null);
  return {
    expression: renderer.expression,
    identifiersUsed: renderer.identifiersUsed,
  };
}
