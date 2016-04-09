import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { HTML } from "reactdown/lib/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    "context": {
      "metadata": metadata
    }
  }, React.createElement("div", null, React.createElement(HTML, {
    "html": "<h1>Alpha</h1>"
  }), React.createElement("p", null, React.createElement(HTML, {
    "html": "<strong>"
  }), "Foo", React.createElement(HTML, {
    "html": "</strong>"
  }), " ", React.createElement(HTML, {
    "html": "<em>"
  }), "bar", React.createElement(HTML, {
    "html": "</em>"
  }), " ", React.createElement(HTML, {
    "html": "<sup>"
  }), "baz", React.createElement(HTML, {
    "html": "</sup>"
  }), " ", React.createElement(HTML, {
    "html": "<sub>"
  }), "qux", React.createElement(HTML, {
    "html": "</sub>"
  }), ".")));
}
export let metadata = null;
