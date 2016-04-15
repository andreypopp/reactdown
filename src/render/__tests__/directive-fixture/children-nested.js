import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { Block } from "lib";
import SubBlock from "lib/SubBlock";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata
    }
  }, React.createElement("div", null, React.createElement("p", null, "Prologue"), React.createElement(Block, null, React.createElement("p", null, "Hello,"), React.createElement(SubBlock, null, React.createElement("p", null, "ok")), React.createElement("p", null, "bye!")), React.createElement("p", null, "Epilogue")));
}
export let metadata = null;
