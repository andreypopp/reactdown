import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Heading, {
    "level": 1
  }, "Horizontal Rules"), React.createElement(components.Break, null), React.createElement(components.Break, null), React.createElement(components.Break, null)));
}
export let metadata = {};
export let model = {
  "toc": [{
    "value": "Horizontal Rules",
    "depth": 1
  }],
  "title": "Horizontal Rules"
};
