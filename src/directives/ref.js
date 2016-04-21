/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import React from 'react';

let refStyle = {
  root: {
    height: 0,
    width: 0,
    top: '-1em',
    visibility: 'hidden',
    position: 'relative',
  }
};

export default function ref({line, name, style}: {name: string; line: string; style: Object}) {
  return <div style={{...refStyle.root, ...style}}><a name={name || line}>#</a></div>;
}

