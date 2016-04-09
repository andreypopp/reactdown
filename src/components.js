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
