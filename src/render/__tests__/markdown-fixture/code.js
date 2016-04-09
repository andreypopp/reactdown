import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import { code } from "reactdown/elements";
import { heading } from "reactdown/elements";
export default function Document() {
  return React.createElement(DocumentContext, {
    "metadata": metadata
  }, React.createElement("div", null, React.createElement(heading, {
    "level": 1
  }, "Code"), React.createElement(code, null, "alert('some JavaScript code.');\n"), React.createElement(code, null, "foo bar baz\n"), React.createElement(code, null, "alpha bravo charlie\n"), React.createElement(code, null, ""), React.createElement(code, null, "  two spaces\n    one\n        two\n    one\n      mixed.\n")));
}
export let metadata = null;
