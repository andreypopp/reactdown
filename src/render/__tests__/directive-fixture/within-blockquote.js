import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    "context": {
      "metadata": metadata
    }
  }, React.createElement("div", null, React.createElement("p", null, "Hello,"), React.createElement("blockquote", null, React.createElement(Block, null, React.createElement("p", null, "Hello"))), React.createElement("p", null, "Bye!")));
}
export let metadata = null;
