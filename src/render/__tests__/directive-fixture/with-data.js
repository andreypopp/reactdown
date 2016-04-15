import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement("div", null, React.createElement("p", null, "Prologue"), React.createElement(Block, {
    "a": 1,
    "b": [1, 2, 3],
    "c": {
      "d": 4
    }
  })));
}
export let metadata = null;
