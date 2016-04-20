import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, React.createElement(elements.Link, {
    "href": "http://example.com",
    "title": "Example Link"
  }, "Example")), React.createElement(elements.Paragraph, null, React.createElement(elements.Link, {
    "href": "http://example.com",
    "title": null
  }, "Example")), React.createElement(elements.Paragraph, null, React.createElement(elements.Link, {
    "href": "http://example.com",
    "title": null
  })), React.createElement(elements.Paragraph, null, React.createElement(elements.Link, {
    "href": "",
    "title": "Example Link"
  })), React.createElement(elements.Paragraph, null, React.createElement(elements.Link, {
    "href": "",
    "title": null
  })), React.createElement(elements.Paragraph, null, React.createElement(elements.Link, {
    "href": "",
    "title": null
  }))));
}
export let metadata = null;
export let model = {
  "toc": [],
  "title": null
};
