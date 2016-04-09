import React from "react";
import { list } from "reactdown/elements";
import { code } from "reactdown/elements";
import { heading } from "reactdown/elements";
export default function Document() {
  return React.createElement("div", null, React.createElement(heading, {
    "level": 1
  }, "Block Quote"), React.createElement("blockquote", null, React.createElement(list, {
    "start": null,
    "ordered": false
  }, React.createElement("li", null, React.createElement(code, null, "code.in.a.list();\n")), React.createElement("li", null, React.createElement("p", null, "Paragraph.")), React.createElement("li", null, React.createElement("p", null, "Normal list"), React.createElement("p", null, "Paragraph.")))));
}
export let metadata = null;
