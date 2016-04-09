import React from "react";
import { Block } from "lib";
export default function Document() {
  return React.createElement("div", null, React.createElement("p", null, "Prologue"), React.createElement(Block, {
    "a": 1,
    "b": 2
  }, React.createElement("p", null, "Ok, ", React.createElement("em", null, "some"), " paragraph.")));
}
export let metadata = null;
