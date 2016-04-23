/**
 * Typings for remark parser.
 *
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {MDASTAnyNode} from '../types';

export type ProduceNode = (node: MDASTAnyNode) => void;
export type Eat = (value: string) => ProduceNode;
