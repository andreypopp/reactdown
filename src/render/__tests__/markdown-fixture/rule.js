import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Heading, {
    "level": 1
  }, "Horizontal Rules"), React.createElement(elements.Break, null), React.createElement(elements.Break, null), React.createElement(elements.Break, null)));
}
export let metadata = null;
