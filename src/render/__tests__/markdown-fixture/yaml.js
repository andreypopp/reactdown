import React from "react";
import { heading } from "reactdown/lib/components";
export default function Document() {
  return React.createElement("div", null, null, React.createElement(heading, {
    "level": 1
  }, "Hello world"));
}
export let metadata = {
  "YAML": "cool"
};
