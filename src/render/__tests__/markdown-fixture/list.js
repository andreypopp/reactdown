import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { code } from "reactdown/lib/elements";
import { html } from "reactdown/lib/elements";
import { list } from "reactdown/lib/elements";
import { heading } from "reactdown/lib/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    "metadata": metadata
  }, React.createElement("div", null, React.createElement(heading, {
    "level": 1
  }, "List"), React.createElement(list, {
    "start": null,
    "ordered": false
  }, React.createElement("li", null, React.createElement("p", null, React.createElement("strong", null, "One"), ";")), React.createElement("li", null, React.createElement("p", null, React.createElement("em", null, "Two"), ";")), React.createElement("li", null, React.createElement("p", null, React.createElement("del", null, "Three"), ".")), React.createElement("li", null, React.createElement("p", null, "One;")), React.createElement("li", null, React.createElement("p", null, "Two;"))), React.createElement(html, {
    "html": "<!--  -->"
  }), React.createElement(list, {
    "start": 4,
    "ordered": true
  }, React.createElement("li", null, React.createElement("p", null, "Four.")), React.createElement("li", null, React.createElement("p", null, "Five.")), React.createElement("li", null, React.createElement("p", null, "Loose:"), React.createElement(list, {
    "start": null,
    "ordered": false
  }, React.createElement("li", null, "Alpha;"), React.createElement("li", null, "Bravo;"), React.createElement("li", null, "Charlie."))), React.createElement("li", null, React.createElement("p", null, "Loose 2:"), React.createElement(list, {
    "start": null,
    "ordered": false
  }, React.createElement("li", null, "Delta;"), React.createElement("li", null, "Echo;"), React.createElement("li", null, "Foxtrot.")))), React.createElement("br", null), React.createElement(code, null, "And a rule.\n")));
}
export let metadata = null;
