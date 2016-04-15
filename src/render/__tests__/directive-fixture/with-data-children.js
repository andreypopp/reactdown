import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as elements from "reactdown/lib/elements";
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "Prologue"), React.createElement(Block, {
    "a": 1,
    "b": 2
  }, React.createElement(elements.Paragraph, null, "Ok, ", React.createElement(elements.Emphasis, null, "some"), " paragraph."))));
}
export let metadata = null;
