/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {MDASTAnyNode} from '../types';
import type {
  DirectiveMapping,
  DirectiveConfig,
  CompleteDirectiveConfig
} from './directive';

import remark from 'remark';
import directive from './directive';

export type {DirectiveConfig, CompleteDirectiveConfig};

export type ParseConfig = {
  directives: DirectiveMapping;
};

const defaultConfig = {
  directives: {},
};

export default function parse(value: string, options: ParseConfig = defaultConfig): MDASTAnyNode {
  return remark(options).use(directive(options.directives)).parse(value);
}
