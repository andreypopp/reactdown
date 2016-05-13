/**
 * Typings for remark parser.
 *
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {MDASTAnyNode, MDASTPosition} from '../types';

export type File = {
  fail(message: string): void;
};

export type Eat = {
  (value: string): (node: MDASTAnyNode) => void;
  now(): MDASTPosition;
  file: File;
};
