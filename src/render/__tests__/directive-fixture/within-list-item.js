import React from "react";
import { list } from "reactdown/lib/components";
import { Block } from "lib";
export default function Document() {
  return React.createElement("div", null, React.createElement("p", null, "List:"), React.createElement(list, {
    "start": null,
    "ordered": false
  }, React.createElement("li", null, React.createElement("p", null, "List item"), React.createElement(Block, null, React.createElement("p", null, "Hello")))), React.createElement("p", null, "Bye!"));
}
export let metadata = null;
