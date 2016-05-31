import React from "react";
import { DocumentContext, directives as defaultDirectives, components as defaultComponents } from "reactdown/runtime";
let components = defaultComponents;
export default function Document({
  className,
  style
}) {
  return React.createElement(DocumentContext, {
    context: {
      meta
    }
  }, React.cloneElement(React.createElement(components.Root, null, React.createElement(components.Table, null, React.createElement(components.TableHead, null, React.createElement(components.TableRow, null, React.createElement(components.TableHeaderCell, {
    "align": null
  }, "Alpha"), React.createElement(components.TableHeaderCell, {
    "align": "left"
  }, "Bravo"), React.createElement(components.TableHeaderCell, {
    "align": "right"
  }, "Charlie"), React.createElement(components.TableHeaderCell, {
    "align": "center"
  }, "Delta"))), React.createElement(components.TableBody, null, React.createElement(components.TableRow, null, React.createElement(components.TableCell, {
    "align": null
  }, "Echo"), React.createElement(components.TableCell, {
    "align": "left"
  }, "Foxtrot"), React.createElement(components.TableCell, {
    "align": "right"
  }, React.createElement(components.Strong, null, "Golf")), React.createElement(components.TableCell, {
    "align": "center"
  })), React.createElement(components.TableRow, null, React.createElement(components.TableCell, {
    "align": null
  }, "India"), React.createElement(components.TableCell, {
    "align": "left"
  }, "Juliett"), React.createElement(components.TableCell, {
    "align": "right"
  }, "Kilo"), React.createElement(components.TableCell, {
    "align": "center"
  }, "Lima")), React.createElement(components.TableRow, null, React.createElement(components.TableCell, {
    "align": null
  }, "Mike"), React.createElement(components.TableCell, {
    "align": "left"
  }, "November"), React.createElement(components.TableCell, {
    "align": "right"
  }, "Oscar"), React.createElement(components.TableCell, {
    "align": "center"
  }, React.createElement(components.Strikethrough, null, "Papa"))), React.createElement(components.TableRow, null, React.createElement(components.TableCell, {
    "align": null
  }, "Quebec"), React.createElement(components.TableCell, {
    "align": "left"
  }, React.createElement(components.Emphasis, null, "Romeo")), React.createElement(components.TableCell, {
    "align": "right"
  }, "Sierra"), React.createElement(components.TableCell, {
    "align": "center"
  }, "Tango")), React.createElement(components.TableRow, null, React.createElement(components.TableCell, {
    "align": null
  }, "Uniform"), React.createElement(components.TableCell, {
    "align": "left"
  }, "Victor"), React.createElement(components.TableCell, {
    "align": "right"
  }, "Whiskey"), React.createElement(components.TableCell, {
    "align": "center"
  }))))), {
    className,
    style
  }));
}
export let meta = {
  data: {},
  model: {
    "toc": [],
    "title": null
  }
};
