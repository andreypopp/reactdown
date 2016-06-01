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
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "http://example.com/favicon.ico",
    "alt": "Example",
    "title": "Example Image"
  })), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "http://example.com/favicon.ico",
    "alt": "Example",
    "title": null
  })), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "http://example.com/favicon.ico",
    "alt": "",
    "title": null
  })), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "",
    "alt": "",
    "title": "Example Image"
  })), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "",
    "alt": "",
    "title": null
  })), React.createElement(components.Paragraph, null, React.createElement(components.Image, {
    "src": "",
    "alt": "",
    "title": null
  }))), {
    className,
    style
  }));
}
export let meta = {
  data: {},
  model: {
    "toc": [],
    "title": null
  }
};
