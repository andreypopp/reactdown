/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 */

import generate from 'babel-generator';
import parse from './parse';
import render from './render';

export function renderToString(value, options = {}) {
  let mdast = parse(value, options);
  let jsast = render(mdast, options).expression;
  return generate(jsast, {
    compact: false,
    concise: false
  });
}

export {parse, render};
