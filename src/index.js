/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 */

import * as DEFAULT_TYPES from 'babel-types';
import generate from 'babel-generator';
import parse from './parse';
import Renderer from './Renderer';

const DEFAULT_RENDER = {
  'paragraph': 'p',
  'root': 'div',
};

export function render(value, options = {}) {
  let {
    types = DEFAULT_TYPES,
    render = DEFAULT_RENDER,
    ...markdownOptions
  } = options;
  let renderer = new Renderer(types, render);
  let node = renderer.render(parse(value, markdownOptions));
  return generate(node);
}

export {parse};
