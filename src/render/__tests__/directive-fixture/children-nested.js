import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
import { Block } from "lib";
import SubBlock from "lib/SubBlock";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "Prologue"), React.createElement(Block, null, React.createElement(elements.Paragraph, null, "Hello,"), React.createElement(SubBlock, null, React.createElement(elements.Paragraph, null, "ok")), React.createElement(elements.Paragraph, null, "bye!")), React.createElement(elements.Paragraph, null, "Epilogue")));
}
export let metadata = null;
export let model = {
  "toc": []
};
