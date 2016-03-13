var React = require('react');
var ReactDOM = require('react-dom');
var keyboardJS = require('keyboardjs');
var map = require('./map.json');

export var HeroPosition = {
  x: 800,
  y: 800
}

export var Hero = React.createClass({
  getInitialState: function() {
    return  {
      x: HeroPosition.x,
      y: HeroPosition.y,
      rectStyle: {
        cx: 0,
        cy: 0,
        fill: '#441537',
        strokeWidth: 1,
        stroke:'rgb(0,0,0)',
        r: 40
      }
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
    var xIndex = Math.floor(x / 100);
    var yIndex = Math.floor(y / 100);
    if(map[xIndex][yIndex].cellType === 'water') { return }
    HeroPosition.x = x;
    HeroPosition.y = y;
    this.setState({
      x,
      y,
      rectStyle: {
        cx: 0,
        cy: 0,
        fill: '#441537',
        strokeWidth: 1,
        stroke:'rgb(0,0,0)',
        r: 40
      }
    });
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
    // console.log('hero render');
    var positionCss = {
      transition: 'transform 0.05s linear',
      transform: 'translate(' + this.state.x + 'px,' + this.state.y + 'px)'
    }
    return (
      <g style={positionCss}>
        <circle style={this.state.rectStyle} />
      </g>
    );
  }
});
