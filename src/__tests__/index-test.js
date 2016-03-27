/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 */

import test from 'ava';
import {render} from '../index';

test('rendering paragraph', t => {
  let {code} = render('Hello, world!');
  console.log(code);
});
