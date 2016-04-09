/**
 * @copyright 2016-present, Reactdown team
 * @flow
 */

import React from 'react';

export function HTML({html} : {html: string}) {
  return <div dangerouslySetInnerHTML={{__html: html}} />;
}

let unknownStyle = {
  root: {
    color: '#5F0101',
    background: 'rgb(255, 231, 231)',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  heading: {
    background: '#FF7575',
    padding: 5,
  },
  report: {
    padding: 10,
    margin: 0,
  }
};

export function Unknown({children} : {children: any}) {
  return (
    <div style={unknownStyle.root}>
      <div style={unknownStyle.heading}>Unknown node found:</div>
      <pre style={unknownStyle.report}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
