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
  }
};

export default function ref({name}: {name: string}) {
  return <div style={refStyle.root}><a name={name}>#</a></div>;
}

