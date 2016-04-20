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
  }, React.createElement(elements.Root, null, React.createElement(elements.Heading, {
    "level": 1
  }, "References"), React.createElement(elements.Paragraph, null, "Entities contains some serious entity tests relating to titles and links\nin definitions."), React.createElement(elements.Paragraph, null, "However, the ", React.createElement(elements.Link, {
    "href": "",
    "title": undefined
  }, "missing"), ", ", React.createElement(elements.Link, {
    "href": "",
    "title": undefined
  }, "missing"), ", and ", React.createElement(elements.Link, {
    "href": "",
    "title": undefined
  }, "missing"), " are omitted."), React.createElement(elements.Paragraph, null, "However, the ", React.createElement(elements.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), ", ", React.createElement(elements.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), ", and ", React.createElement(elements.Image, {
    "src": "",
    "alt": "missing",
    "title": undefined
  }), " are omitted."), React.createElement(elements.Paragraph, null, "Same goes for ", React.createElement(elements.Link, {
    "href": "",
    "title": undefined
  }), " and ", React.createElement(elements.Image, {
    "src": "",
    "alt": "",
    "title": undefined
  }), "."), null));
}
export let metadata = {};
export let model = {
  "toc": [{
    "value": "References",
    "depth": 1
  }],
  "title": "References"
};
