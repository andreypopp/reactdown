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
  }, React.createElement(elements.Root, null, React.createElement(elements.HTML, {
    "html": "<h1>Alpha</h1>"
  }), React.createElement(elements.Paragraph, null, React.createElement(elements.HTML, {
    "html": "<strong>"
  }), "Foo", React.createElement(elements.HTML, {
    "html": "</strong>"
  }), " ", React.createElement(elements.HTML, {
    "html": "<em>"
  }), "bar", React.createElement(elements.HTML, {
    "html": "</em>"
  }), " ", React.createElement(elements.HTML, {
    "html": "<sup>"
  }), "baz", React.createElement(elements.HTML, {
    "html": "</sup>"
  }), " ", React.createElement(elements.HTML, {
    "html": "<sub>"
  }), "qux", React.createElement(elements.HTML, {
    "html": "</sub>"
  }), ".")));
}
export let metadata = null;
export let model = {
  "toc": []
};
