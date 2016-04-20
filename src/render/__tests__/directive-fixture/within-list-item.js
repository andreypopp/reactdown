import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultComponents from "reactdown/lib/components";
import * as customComponents from "reactdown/lib/components";
let components = { ...defaultComponents, ...customComponents };
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "List:"), React.createElement(components.UnorderedList, null, React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, "List item"), React.createElement(Block, null, React.createElement(components.Paragraph, null, "Hello")))), React.createElement(components.Paragraph, null, "Bye!")));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
