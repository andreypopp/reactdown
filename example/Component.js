/**
 * @jsx React.DOM
 */
var React = require('react');

var Component = React.createClass({

  render: function() {
    return (
      <div className="Component">
        <h1>Some component</h1>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Component;
