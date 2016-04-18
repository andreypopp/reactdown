
import React from 'react';

import {
  Root as BaseRoot,
  Link,
  Heading as BaseHeading
} from './theme.react.css';

import {contextTypes} from 'reactdown/lib/DocumentContext';

class ToC extends React.Component {

  static contextTypes = contextTypes;

  render() {
    let {toc} = this.context.reactdown.model;
    let items = toc.map(item =>
      <div style={{marginBottom: 2, paddingLeft: (item.depth - 1) * 20}}>
        <Link href={'#' + item.value}>{item.value}</Link>
      </div>
    );
    return <div>{items}</div>;
  }

}

export function Heading({children, ...props}) {
  return (
    <BaseHeading {...props}>
      {children}
      <a style={{visibility: 'hidden', top: -50, position: 'relative'}} name={children}>#</a>
    </BaseHeading>
  );
}

export function Root({children, ...props}) {
  return (
    <div>
      <BaseRoot>
        <div style={{position: 'fixed', left: 50}}>
          <ToC />
        </div>
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
