var React = require('react');
var Scene = require('./scene').Scene;

export var Screen = React.createClass({
  render: function() {
    return (
      <svg width="100%" height="100%" key="1">
        <Scene />
      </svg>
    );
  }
});
