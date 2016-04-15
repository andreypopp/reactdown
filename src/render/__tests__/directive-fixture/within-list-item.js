import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as elements from "reactdown/lib/elements";
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "List:"), React.createElement(elements.UnorderedList, null, React.createElement(elements.ListItem, null, React.createElement(elements.Paragraph, null, "List item"), React.createElement(Block, null, React.createElement(elements.Paragraph, null, "Hello")))), React.createElement(elements.Paragraph, null, "Bye!")));
}
export let metadata = null;
