import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, null, React.createElement(components.Heading, {
    "level": 1
  }, "Hello world")));
}
export let metadata = {
  "YAML": "cool"
};
export let model = {
  "toc": [{
    "value": "Hello world",
    "depth": 1
  }],
  "title": "Hello world"
};
