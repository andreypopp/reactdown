import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    "context": {
      "metadata": metadata
    }
  }, React.createElement("div", null, React.createElement("p", null, "List:"), React.createElement("ul", null, React.createElement("li", null, React.createElement("p", null, "List item"), React.createElement(Block, null, React.createElement("p", null, "Hello")))), React.createElement("p", null, "Bye!")));
}
export let metadata = null;
