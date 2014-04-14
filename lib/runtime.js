"use strict";

var React     = require('react');
var merge     = require('react/lib/merge');

function Wrapper() {
  return Array.prototype.slice.call(arguments, 1);
}

var Reactdown = React.createClass({
  displayName: 'Reactdown',
  render: function() {
    return React.DOM.div(null, this.props.children);
  }
});

module.exports = {
  Wrapper: Wrapper,
  Reactdown: Reactdown,
  merge: merge,
};
