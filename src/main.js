var React = require('react');
var ReactDOM = require('react-dom');
var keyboardJS = require('keyboardjs');
var us = require('underscore');


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
    return {
      fill: this.randomColor()
    }
  },
  randomColor: function() {
    var red = 29;
    var green = 156;
    var blue = 73;
    red = red + us.random(-10, 10)
    green = green + us.random(-10, 10)
    blue = blue + us.random(-10, 10)
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
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
      </svg>
    );
  }
});



ReactDOM.render(
  <GrassField />,
  document.getElementById('example')
);
