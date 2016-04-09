import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { heading } from "reactdown/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    "metadata": metadata
  }, React.createElement("div", null, React.createElement(heading, {
    "level": 1
  }, "Horizontal Rules"), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null)));
}
export let metadata = null;
