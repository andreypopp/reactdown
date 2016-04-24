import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
import { Children } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Hello,"), React.createElement(components.Blockquote, null, React.createElement(Children, null, React.createElement(components.Paragraph, null, "Hello"))), React.createElement(components.Paragraph, null, "Bye!")));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
