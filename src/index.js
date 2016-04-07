/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {RenderConfig} from './render';

import generate from 'babel-generator';
import parse from './parse';
import {renderToProgram} from './render';

export function renderToString(value: string, config: RenderConfig = {}): {code: string} {
  let mdast = parse(value);
  let jsast = renderToProgram(mdast, config);
  return generate(jsast, {
    compact: false,
    concise: false
  });
}

export {parse};
