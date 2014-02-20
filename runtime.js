"use strict";

var React   = require('react');
var merge   = require('react/lib/merge');
var toArray = require('react/lib/toArray');

function Wrapper() {
  return toArray(arguments).slice(1);
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
  merge: merge
};
