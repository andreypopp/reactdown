import React from "react";
import { DocumentContext, directives as defaultDirectives } from "reactdown/runtime";
import { components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      meta
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Heading, {
    "level": 1,
    "name": "Block-Quote"
  }, "Block Quote"), React.createElement(components.Blockquote, null, React.createElement(components.UnorderedList, null, React.createElement(components.ListItem, null, React.createElement(components.Code, null, "code.in.a.list();\n")), React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, "Paragraph.")), React.createElement(components.ListItem, null, React.createElement(components.Paragraph, null, "Normal list"), React.createElement(components.Paragraph, null, "Paragraph."))))), {
    className,
    style
  }));
}
export let meta = {
  data: {},
  model: {
    "toc": [{
      "title": "Block Quote",
      "name": "Block-Quote",
      "depth": 1
    }],
    "title": "Block Quote"
  }
};
