var React = require('react');
var ReactDOM = require('react-dom');
var us = require('underscore');
var randomColor = require('./utils/random_color').default;

export var Bush = React.createClass({
  getInitialState: function() {
    var countOfLeaves = us.random(100, 200);
    var leaves = us.range(countOfLeaves).map(function (_, index) {
      var cx = us.random(0,40)
      var cy = us.random(0,40)
      var center = {
        x: 20,
        y: 20
      }
      var center = `${us.random(-10, 10)},${us.random(-10, 10)}`;
      var leftRightCoeff = 20;
      var edgePointCoeff = 120;
      var edgePoint = `${us.random(-edgePointCoeff, edgePointCoeff)},${us.random(-edgePointCoeff, edgePointCoeff)}`;
      var leftPoint = `${us.random(-leftRightCoeff, leftRightCoeff)},${us.random(-leftRightCoeff, leftRightCoeff)}`;
      var rightPoint = `${us.random(-leftRightCoeff, leftRightCoeff)},${us.random(-leftRightCoeff, leftRightCoeff)}`;
      var points = `${center} ${leftPoint} ${edgePoint} ${rightPoint}`;
      var leaveStyle = {
        fill: randomColor(33,215,34, 100)
      }

      return (
        <polygon style={leaveStyle} points={points} key={index} />
      )
    });
    return {
      leaves,
      style: {
        transform: `translate(${this.props.x}px, ${this.props.y}px)`
      }
    }
  },
  render: function() {
    var cyrcleStyle = {
      fill: '#000000',
      cx: '0',
      cy: '0',
      r: '100px',
      opacity: 0.3
    }
    return (
      <g style={this.state.style}>
        <circle style={cyrcleStyle} />
        {this.state.leaves}
      </g>
    );
  }
});
