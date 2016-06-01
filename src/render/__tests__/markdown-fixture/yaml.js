import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      meta
    }
  }, React.cloneElement(React.createElement(components.Root, null, null, React.createElement(components.Heading, {
    "level": 1,
    "name": "Hello-world"
  }, "Hello world")), {
    className,
    style
  }));
}
export let meta = {
  data: {
    "YAML": "cool"
  },
  model: {
    "toc": [{
      "title": "Hello world",
      "name": "Hello-world",
      "depth": 1
    }],
    "title": "Hello world"
  }
};
