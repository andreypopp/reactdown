import React from "react";
import { Block } from "lib";
export default function Document() {
  return React.createElement("div", null, React.createElement("p", null, "Hello,"), React.createElement("blockquote", null, React.createElement(Block, null, React.createElement("p", null, "Hello"))), React.createElement("p", null, "Bye!"));
}
export let metadata = null;
