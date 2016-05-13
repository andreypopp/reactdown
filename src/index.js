/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {Config} from './Config';

import generate from 'babel-generator';
import parse from './parse';
import {renderToProgram} from './render';
import {
  mergeConfig,
  defaultConfig,
  toRenderConfig,
  toParseConfig
} from './Config';

export function renderToString(value: string, config: Config = {}): {code: string} {
  config = mergeConfig(defaultConfig, config);
  let renderConfig = toRenderConfig(config);
  let parseConfig = toParseConfig(config);
  let mdast = parse(value, parseConfig);
  let jsast = renderToProgram(mdast, renderConfig);
  return generate(jsast, {
    compact: false,
    concise: false
  });
}

export {parse};
