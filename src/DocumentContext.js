/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import React from 'react';

export let contextTypes = {
  reactdown: React.PropTypes.object,
};

export default class DocumentContext extends React.Component {

  static childContextTypes = contextTypes;

  getChildContext() {
    return {reactdown: this.props.context};
  }

  render() {
    let {children} = this.props;
    return React.Children.only(children);
  }
}
