/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {MDASTRootNode} from '../types';
import type {
  DirectiveMapping,
  DirectiveConfig,
} from './directive';

import remark from 'remark';
import directive from './directive';
import tk from './tk';
import role from './role';

export type {DirectiveConfig};

export type ParseConfig = {
  directives: DirectiveMapping;
};

const defaultConfig = {
  directives: {},
};

export default function parse(value: string, options: ParseConfig = defaultConfig): MDASTRootNode {
  return remark(options)
    .use(directive(options.directives))
    .use(tk())
    .use(role())
    .parse(value);
}
