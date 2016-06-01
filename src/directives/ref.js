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

type Props = {
  name?: string;
  line?: string;
  style?: Object;
};

export default function ref({line, name, style}: Props) {
  return <div style={{...refStyle.root, ...style}}><a name={name || line}>#</a></div>;
}

