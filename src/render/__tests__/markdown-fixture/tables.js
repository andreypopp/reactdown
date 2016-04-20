import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Table, null, React.createElement(elements.TableHead, null, React.createElement(elements.TableRow, null, React.createElement(elements.TableHeaderCell, {
    "align": null
  }, "Alpha"), React.createElement(elements.TableHeaderCell, {
    "align": "left"
  }, "Bravo"), React.createElement(elements.TableHeaderCell, {
    "align": "right"
  }, "Charlie"), React.createElement(elements.TableHeaderCell, {
    "align": "center"
  }, "Delta"))), React.createElement(elements.TableBody, null, React.createElement(elements.TableRow, null, React.createElement(elements.TableCell, {
    "align": null
  }, "Echo"), React.createElement(elements.TableCell, {
    "align": "left"
  }, "Foxtrot"), React.createElement(elements.TableCell, {
    "align": "right"
  }, React.createElement(elements.Strong, null, "Golf")), React.createElement(elements.TableCell, {
    "align": "center"
  })), React.createElement(elements.TableRow, null, React.createElement(elements.TableCell, {
    "align": null
  }, "India"), React.createElement(elements.TableCell, {
    "align": "left"
  }, "Juliett"), React.createElement(elements.TableCell, {
    "align": "right"
  }, "Kilo"), React.createElement(elements.TableCell, {
    "align": "center"
  }, "Lima")), React.createElement(elements.TableRow, null, React.createElement(elements.TableCell, {
    "align": null
  }, "Mike"), React.createElement(elements.TableCell, {
    "align": "left"
  }, "November"), React.createElement(elements.TableCell, {
    "align": "right"
  }, "Oscar"), React.createElement(elements.TableCell, {
    "align": "center"
  }, React.createElement(elements.Strikethrough, null, "Papa"))), React.createElement(elements.TableRow, null, React.createElement(elements.TableCell, {
    "align": null
  }, "Quebec"), React.createElement(elements.TableCell, {
    "align": "left"
  }, React.createElement(elements.Emphasis, null, "Romeo")), React.createElement(elements.TableCell, {
    "align": "right"
  }, "Sierra"), React.createElement(elements.TableCell, {
    "align": "center"
  }, "Tango")), React.createElement(elements.TableRow, null, React.createElement(elements.TableCell, {
    "align": null
  }, "Uniform"), React.createElement(elements.TableCell, {
    "align": "left"
  }, "Victor"), React.createElement(elements.TableCell, {
    "align": "right"
  }, "Whiskey"), React.createElement(elements.TableCell, {
    "align": "center"
  }))))));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
