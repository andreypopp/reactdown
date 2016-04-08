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
