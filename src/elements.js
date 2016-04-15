/**
 * @copyright 2016-present, Reactdown team
 * @flow
 */

import React from 'react';

export let Root =  'div';
export let Paragraph =  'p';
export let Strikethrough =  'del';
export let Image =  'img';
export let Break =  'br';
export let Emphasis =  'em';
export let Strong =  'strong';
export let InlineCode =  'code';
export let Rule =  'hr';
export let Table =  'table';
export let TableBody =  'tbody';
export let TableHead =  'thead';
export let TableRow =  'tr';
export let TableHeaderCell =  'th';
export let TableCell =  'td';
export let Blockquote =  'blockquote';
export let Code =  'code';
export let Link =  'a';
export let ListItem =  'li';
export let OrderedList =  'ol';
export let UnorderedList =  'ul';

export function HTML({html} : {html: string}) {
  return <div dangerouslySetInnerHTML={{__html: html}} />;
}

export function Heading({level, ...props}) {
  let Component = 'h' + Math.min(level, 6);
  return <Component {...props} />;
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
