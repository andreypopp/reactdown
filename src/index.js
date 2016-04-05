/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import generate from 'babel-generator';
import parse from './parse';
import render from './render';

export function renderToString(value: string, options: any = {}): string {
  let mdast = parse(value, options);
  let jsast = render(mdast, options).expression;
  return generate(jsast, {
    compact: false,
    concise: false
  });
}

export {parse, render};
