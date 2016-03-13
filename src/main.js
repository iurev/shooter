var React = require('react');
var ReactDOM = require('react-dom');
var keyboardJS = require('keyboardjs');
var us = require('underscore');
var map = require('./map.json');

var randomColor = function(red=29, green=156, blue=73, difference = 10) {
  red = red + us.random(-difference, difference)
  green = green + us.random(-difference, difference)
  blue = blue + us.random(-difference, difference)
  return 'rgb(' + red + ',' + green + ',' + blue + ')';
};

var Bush = React.createClass({
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
        <polygon style={leaveStyle} points={points} />
      )
    });
    return {
      leaves,
      style: {
        transform: 'translate(400px, 500px)'
      }
    }
  },
  render: function() {
    var cyrcleStyle = {
      fill: '#000000',
      cx: '0',
      cy: '0',
      r: '50px',
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

var Hero = React.createClass({
  getInitialState: function() {
    return  {
      rectStyle: {
        cx: '50%',
        cy: '50%',
        fill: '#441537',
        strokeWidth: 1,
        stroke:'rgb(0,0,0)',
        r: 40
      }
    };
  },
  render: function() {
    return (
      <circle style={this.state.rectStyle} />
    );
  }
});

var Grass = React.createClass({
  getInitialState: function() {
    var cellType = map[this.props.xIndex][this.props.yIndex].cellType;
    return {
      cellType,
      fill: this.getColorByType(cellType)
    }
  },
  getColorByType: function(cellType = this.stats.cellType) {
    switch (cellType) {
      case 'grass':
        return randomColor()
        break;
      case 'sand':
        return randomColor(240,231,0)
        break;
      case 'water':
        return randomColor(85,134,240)
        break;
    }
  },
  render: function() {
    console.log('render grass');
    var width = 100;
    var height = 100;
    var rectStyle = {
      fill: this.state.fill,
      strokeWidth: 0,
      stroke:'rgb(0,0,0)',
      x: this.props.xIndex * width,
      y: this.props.yIndex * height
    };

    return (
      <rect width={width} height={height} style={rectStyle} />
    );
  }
});

var GrassField = React.createClass({
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
      x: 0,
      y: 0,
      grasses
    };
  },
  move: function(direction) {
    var x = this.state.x;
    var y = this.state.y;
    var speed = 30;
    switch (direction) {
      case 'left':
        x -= speed;
        break;
      case 'right':
        x += speed;
        break;
      case 'top':
        y -= speed;
        break;
      case 'down':
        y += speed;
        break;
      default:

    }(direction)
    this.setState({x: x, y: y});
  },
  componentDidMount: function() {
    var that = this;
    keyboardJS.bind('a', function(e) {
      that.move('left');
    });
    keyboardJS.bind('w', function(e) {
      that.move('top');
    });
    keyboardJS.bind('d', function(e) {
      that.move('right');
    });
    keyboardJS.bind('s', function(e) {
      that.move('down');
    });
  },
  render: function() {
    console.log('render grass field');
    var positionCss = {
      transition: 'transform 0.1s linear',
      transform: 'translate(' + this.state.x + 'px,' + this.state.y + 'px)'
    }
    return (
      <svg width="100%" height="100%" onKeyDown={this.onKeyDown} key="1">
        <g style={positionCss}>
          {this.state.grasses}
        </g>
        <Hero />
        <Bush />
      </svg>
    );
  }
});



ReactDOM.render(
  <GrassField />,
  document.getElementById('example')
);
