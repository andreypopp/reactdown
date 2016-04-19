/**
 * @copyright 2016, Andrey Popp <8mayday@gmail.com>
 * @flow
 */

import React from 'react';

let refStyle = {
  root: {
    height: 0,
    width: 0,
    visibility: 'hidden',
    position: 'relative',
  }
};

export default function ref({name, style}: {name: string, style: Object}) {
  return <div style={{...refStyle.root, ...style}}><a name={name}>#</a></div>;
}

