import React from "react";
import { Block } from "lib";
export default function Document() {
  return React.createElement("div", null, React.createElement("p", null, "Prologue"), React.createElement(Block, null, React.createElement("p", null, "Hello,"), React.createElement("p", null, "This is ", React.createElement("em", null, "just"), " some\nparagraph."), React.createElement("p", null, "Cheers!")), React.createElement("p", null, "Epilogue"));
}
export let metadata = null;
