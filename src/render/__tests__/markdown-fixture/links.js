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
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, React.createElement(components.Link, {
    "href": "http://example.com",
    "title": "Example Link"
  }, "Example")), React.createElement(components.Paragraph, null, React.createElement(components.Link, {
    "href": "http://example.com",
    "title": null
  }, "Example")), React.createElement(components.Paragraph, null, React.createElement(components.Link, {
    "href": "http://example.com",
    "title": null
  })), React.createElement(components.Paragraph, null, React.createElement(components.Link, {
    "href": "",
    "title": "Example Link"
  })), React.createElement(components.Paragraph, null, React.createElement(components.Link, {
    "href": "",
    "title": null
  })), React.createElement(components.Paragraph, null, React.createElement(components.Link, {
    "href": "",
    "title": null
  }))));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
