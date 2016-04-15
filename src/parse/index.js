/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {MDASTAnyNode} from '../types';
import type {DirectiveMapping, DirectiveConfig} from './directive';

import remark from 'remark';
import directive from './directive';

export type {DirectiveConfig};

export type ParseConfig = {
  directives: DirectiveMapping;
};

const DEFAULT_CONFIG = {
  directives: {},
};

export default function parse(value: string, options: ParseConfig = DEFAULT_CONFIG): MDASTAnyNode {
  return remark(options).use(directive(options.directives)).parse(value);
}
