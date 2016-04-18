
import React from 'react';

import {
  Root as BaseRoot,
  Link,
  Heading as BaseHeading,
  HeadingAnchor,

  ToC as BaseToC,
  ToCItem
} from './theme.react.css';

import {contextTypes} from 'reactdown/lib/DocumentContext';

function ToC(_props, context) {
  let {toc} = context.reactdown.model;
  let items = toc.map(item =>
    <ToCItem style={{marginLeft: (item.depth - 1) * 20}}>
      <Link href={'#' + item.value}>{item.value}</Link>
    </ToCItem>
  );
  return <BaseToC>{items}</BaseToC>;
}
ToC.contextTypes = contextTypes;

export function Heading({children, ...props}) {
  return (
    <BaseHeading {...props}>
      {children}
      <HeadingAnchor name={children}>#</HeadingAnchor>
    </BaseHeading>
  );
}

export function Root({children, ...props}) {
  return (
    <div>
      <BaseRoot>
        <ToC />
        {children}
      </BaseRoot>
    </div>
  );
}

export {
  Paragraph,
  OrderedList,
  UnorderedList,
  InlineCode,
  Emphasis,
  Strong,
  Code,
  Link
} from './theme.react.css';
