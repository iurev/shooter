var React = require('react');
var us = require('underscore');
var map = require('./map.json');
var Grass = require('./grass').Grass;

export var GrassField = React.createClass({
  getInitialState: function() {
    var grasses = us.range(30).map(function (_, xIndex) {
      return us.range(30).map(function (_, yIndex) {
        var xString = xIndex.toString();
        xString = us.range(3-xString.length).map(function() {return "0";}).join("") + xString;
        var yString = yIndex.toString();
        yString = us.range(3-yString.length).map(function() {return "0";}).join("") + yString;
        var key = xString + yString;
        return (
          <Grass xIndex={xIndex} yIndex={yIndex} key={key}/>
        );
      });
    });
    var grasses = us.flatten(grasses);
    return {
      grasses
    };
  },
  render: function() {
    return (
      <g>
        {this.state.grasses}
      </g>
    );
  }
});
