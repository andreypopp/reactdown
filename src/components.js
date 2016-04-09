/**
 * @copyright 2016-present, Reactdown team
 * @flow
 */

import React from 'react';

export function heading({level, ...props} : {level: number}) {
  let Component = 'h' + (level > 6 ? 6 : level);
  return <Component {...props} />;
}

export function list({ordered, ...props} : {ordered: boolean}) {
  let Component = ordered ? 'ol' : 'ul';
  return <Component {...props} />;
}

export function html({html} : {html: string}) {
  return <div dangerouslySetInnerHTML={{__html: html}} />;
}

export function code({children} : {children: any}) {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
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

export function unknown({children} : {children: any}) {
  return (
    <div style={unknownStyle.root}>
      <div style={unknownStyle.heading}>Unknown node found:</div>
      <pre style={unknownStyle.report}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
