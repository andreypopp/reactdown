import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "Prologue"), React.createElement(Block, {
    "a": 1,
    "b": [1, 2, 3],
    "c": {
      "d": 4
    }
  })));
}
export let metadata = null;
export let model = {
  "toc": []
};
