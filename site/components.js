
import React from 'react';

import {
  Root as BaseRoot,
  Link,
  Heading as BaseHeading,
  Sidebar,

  ToC as BaseToC,
  ToCItem,

  NoteRoot,
  NoteTitle,
  NoteContent
} from './theme.react.css';

import Ref from 'reactdown/lib/directives/ref';
import {contextTypes} from 'reactdown/lib/DocumentContext';

function ToC({fromDepth = 1, toDepth = 6}, context) {
  let {toc} = context.reactdown.model;
  let items = toc
    .filter(item => item.depth >= fromDepth && item.depth <= toDepth)
    .map(item =>
      <ToCItem
        key={item.value}
        level={item.depth - fromDepth + 1}>
        <Link href={'#' + item.value}>{item.value}</Link>
      </ToCItem>
    );
  return (
    <BaseToC>
      {items}
    </BaseToC>
  );
}
ToC.contextTypes = contextTypes;

export function Heading({children, ...props}) {
  return (
    <BaseHeading {...props}>
      <Ref name={children} />
      {children}
    </BaseHeading>
  );
}

export function Root({children, ...props}) {
  return (
    <div>
      <BaseRoot>
        <Sidebar>
          <Heading level={2}>Reactdown</Heading>
          <ToC fromDepth={2} />
        </Sidebar>
        {children}
      </BaseRoot>
    </div>
  );
}

export function Note({children, line}) {
  return (
    <NoteRoot>
      {line && <NoteTitle>{line}</NoteTitle>}
      <NoteContent>{children}</NoteContent>
    </NoteRoot>
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
