import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultComponents from "reactdown/lib/components";
import * as customComponents from "reactdown/lib/components";
let components = { ...defaultComponents, ...customComponents };
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, React.createElement(components.Image, {
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
  }))));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
