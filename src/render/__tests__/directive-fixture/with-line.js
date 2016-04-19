import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
import ref from "reactdown/lib/directives/ref";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "Ok"), React.createElement(ref, {
    "line": "some-ref"
  }), React.createElement(elements.Paragraph, null, "wow")));
}
export let metadata = null;
export let model = {
  "toc": []
};
