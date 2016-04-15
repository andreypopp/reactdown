import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as elements from "reactdown/lib/elements";
import { Block } from "lib";
import SubBlock from "lib/SubBlock";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "Prologue"), React.createElement(Block, null, React.createElement(elements.Paragraph, null, "Hello,"), React.createElement(SubBlock, null, React.createElement(elements.Paragraph, null, "ok")), React.createElement(elements.Paragraph, null, "bye!")), React.createElement(elements.Paragraph, null, "Epilogue")));
}
export let metadata = null;
