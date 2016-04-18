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
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "Hello", React.createElement(elements.Break, null), "world"), React.createElement(elements.Break, null), React.createElement(elements.Paragraph, null, React.createElement(elements.Image, {
    "src": "http://exaple.com/fav.ico",
    "alt": "Favicon",
    "title": "Example Favicon"
  }))));
}
export let metadata = null;
export let model = {
  "toc": []
};
