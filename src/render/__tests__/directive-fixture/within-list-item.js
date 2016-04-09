import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { list } from "reactdown/lib/elements";
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    "context": {
      "metadata": metadata
    }
  }, React.createElement("div", null, React.createElement("p", null, "List:"), React.createElement(list, {
    "start": null,
    "ordered": false
  }, React.createElement("li", null, React.createElement("p", null, "List item"), React.createElement(Block, null, React.createElement("p", null, "Hello")))), React.createElement("p", null, "Bye!")));
}
export let metadata = null;
