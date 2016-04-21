/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import type {MDASTRootNode} from '../types';
import type {
  DirectiveMapping,
  DirectiveConfig,
  CompleteDirectiveConfig
} from './directive';

import remark from 'remark';
import directive from './directive';
import role from './role';

export type {DirectiveConfig, CompleteDirectiveConfig};

export type ParseConfig = {
  directives: DirectiveMapping;
};

const defaultConfig = {
  directives: {},
};

export default function parse(value: string, options: ParseConfig = defaultConfig): MDASTRootNode {
  return remark(options)
    .use(directive(options.directives))
    .use(role())
    .parse(value);
}
