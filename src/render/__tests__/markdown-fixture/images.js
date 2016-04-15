import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as elements from "reactdown/lib/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "http://example.com/favicon.ico",
    "alt": "Example",
    "title": "Example Image"
  })), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "http://example.com/favicon.ico",
    "alt": "Example",
    "title": null
  })), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "http://example.com/favicon.ico",
    "alt": "",
    "title": null
  })), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "",
    "alt": "",
    "title": "Example Image"
  })), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "",
    "alt": "",
    "title": null
  })), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "",
    "alt": "",
    "title": null
  }))));
}
export let metadata = null;
