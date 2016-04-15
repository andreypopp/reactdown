/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {Config} from './Config';

import generate from 'babel-generator';
import parse from './parse';
import {renderToProgram} from './render';
import {mergeConfig, defaultConfig} from './Config';

export function renderToString(value: string, config: Config = {}): {code: string} {
  config = mergeConfig(defaultConfig, config);
  let mdast = parse(value, config);
  let jsast = renderToProgram(mdast, config);
  return generate(jsast, {
    compact: false,
    concise: false
  });
}

export {parse};
