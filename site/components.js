/**
 * @copyright 2016-present, Reactdown team
 */

import React from 'react';

import Ref from 'reactdown/lib/directives/ref';
import {contextTypes} from 'reactdown/lib/DocumentContext';
import Helmet from 'react-helmet';

import {
  Root as BaseRoot,
  Link,
  Heading as BaseHeading,
  Sidebar,

  ToC as BaseToC,
  ToCItem,

  NoteRoot,
  NoteTitle,
  NoteContent,

  TKRoot,
  TKTitle
} from './components.rcss';

function ToC({fromDepth = 1, toDepth = 6}, context) {
  let {toc} = context.reactdown.meta.model;
  let items = toc
    .filter(item => item.depth >= fromDepth && item.depth <= toDepth)
    .map(item =>
      <ToCItem
        key={item.name}
        level={item.depth - fromDepth + 1}>
        <Link href={'#' + item.name}>{item.title}</Link>
      </ToCItem>
    );
  return (
    <BaseToC>
      {items}
    </BaseToC>
  );
}
ToC.contextTypes = contextTypes;

export function Heading({children, name, ...props}) {
  return (
    <BaseHeading {...props}>
      <Ref name={name} />
      {children}
    </BaseHeading>
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

export function Root({children, ...props}, {reactdown: {meta}}) {
  return (
    <BaseRoot>
      <Helmet title={meta.data.title || meta.model.title} />
      <Sidebar>
        <Heading level={2}>Reactdown</Heading>
        <ToC fromDepth={2} />
      </Sidebar>
      {children}
    </BaseRoot>
  );
}
Root.contextTypes = contextTypes;

export function TK({line, ...props}) {
  return <TKRoot><TKTitle>TK</TKTitle> {line}</TKRoot>;
}

export {
  Paragraph,
  OrderedList,
  UnorderedList,
  InlineCode,
  Emphasis,
  Strong,
  Code,
  Link,
  ListItem
} from './components.rcss';
