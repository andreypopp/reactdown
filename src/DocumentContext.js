/**
 * @copyright 2016-present, Reactdown Team
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
