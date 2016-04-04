/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 */

import remark from 'remark';
import customBlock from './customBlock';

export default function parse(value, options = {}) {
  return remark(options).use(customBlock).parse(value);
}
