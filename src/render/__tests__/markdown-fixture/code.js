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
  }, "Code"), React.createElement(elements.Code, null, "alert('some JavaScript code.');\n"), React.createElement(elements.Code, null, "foo bar baz\n"), React.createElement(elements.Code, null, "alpha bravo charlie\n"), React.createElement(elements.Code, null, ""), React.createElement(elements.Code, null, "  two spaces\n    one\n        two\n    one\n      mixed.\n")));
}
export let metadata = null;
export let model = {
  "toc": [{
    "value": "Code",
    "depth": 1
  }],
  "title": "Code"
};
