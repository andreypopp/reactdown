/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import React from 'react';
import {contextTypes} from '../DocumentContext';

let metaStyle = {
  root: {
    color: '#444',
    background: 'rgb(226, 226, 226)',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  heading: {
    background: 'rgb(175, 175, 175)',
    padding: 5,
  },
  report: {
    padding: 10,
    margin: 0,
  }
};


export default class meta extends React.Component {

  static contextTypes = contextTypes;

  render() {
    let metadata = JSON.stringify(this.context.reactdown.metadata, null, 2);
    return (
      <div style={metaStyle.root}>
        <div style={metaStyle.heading}>Document metadata:</div>
        <pre style={metaStyle.report}>
          <code>{metadata}</code>
        </pre>
      </div>
    );
  }
}
