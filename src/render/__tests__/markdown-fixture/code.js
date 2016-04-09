import React from "react";
import { code } from "reactdown/lib/components";
import { heading } from "reactdown/lib/components";
export default function Document() {
  return React.createElement("div", null, React.createElement(heading, {
    "level": 1
  }, "Code"), React.createElement(code, null, "alert('some JavaScript code.');\n"), React.createElement(code, null, "foo bar baz\n"), React.createElement(code, null, "alpha bravo charlie\n"), React.createElement(code, null, ""), React.createElement(code, null, "  two spaces\n    one\n        two\n    one\n      mixed.\n"));
}
export let metadata = null;
