import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as elements from "reactdown/lib/elements";
import { Block } from "lib";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "Prologue"), React.createElement(Block, null, React.createElement(elements.Paragraph, null, "Hello,"), React.createElement(elements.Paragraph, null, "This is ", React.createElement(elements.Emphasis, null, "just"), " some\nparagraph."), React.createElement(elements.Paragraph, null, "Cheers!")), React.createElement(elements.Paragraph, null, "Epilogue")));
}
export let metadata = null;
