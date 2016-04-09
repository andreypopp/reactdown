/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import React from 'react';
import {contextTypes} from '../DocumentContext';

export default class meta extends React.Component {

  static contextTypes = contextTypes;

  render() {
    return <pre>{JSON.stringify(this.context.reactdown, null, 2)}</pre>;
  }
}
