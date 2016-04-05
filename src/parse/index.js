/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import remark from 'remark';
import customBlock from './customBlock';
import type {MDASTAnyNode} from '../types';

export default function parse(value: string, options: any = {}): MDASTAnyNode {
  return remark(options).use(customBlock).parse(value);
}
