import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { list } from "reactdown/lib/elements";
import { code } from "reactdown/lib/elements";
import { heading } from "reactdown/lib/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    "context": {
      "metadata": metadata
    }
  }, React.createElement("div", null, React.createElement(heading, {
    "level": 1
  }, "Block Quote"), React.createElement("blockquote", null, React.createElement(list, {
    "start": null,
    "ordered": false
  }, React.createElement("li", null, React.createElement(code, null, "code.in.a.list();\n")), React.createElement("li", null, React.createElement("p", null, "Paragraph.")), React.createElement("li", null, React.createElement("p", null, "Normal list"), React.createElement("p", null, "Paragraph."))))));
}
export let metadata = null;
