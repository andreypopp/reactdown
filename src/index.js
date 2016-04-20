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
  let parseConfig = {
    directives: extractObject(config.directives, config => config.parse),
  };
  let renderConfig = {
    directives: extractObject(config.directives, config => config.render),
    components: config.components,
  };
  let mdast = parse(value, parseConfig);
  let jsast = renderToProgram(mdast, renderConfig);
  return generate(jsast, {
    compact: false,
    concise: false
  });
}

export {parse};

function extractObject(object, extract) {
  let result = {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      let value = extract(object[key]);
      if (value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result;
}
