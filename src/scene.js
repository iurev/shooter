var React = require('react');
var keyboardJS = require('keyboardjs');
var GrassField = require('./grass_field').GrassField;
var Hero = require('./hero').Hero;
var Bullets = require('./bullets').Bullets;
var Bush = require('./bush').Bush;

export var Scene = React.createClass({
  getInitialState: function() {
    return {
      x: 0,
      y: 0
    };
  },
  move: function(direction) {
    var x = this.state.x;
    var y = this.state.y;
    var speed = 30;
    switch (direction) {
      case 'left':
        x += speed;
        break;
      case 'right':
        x -= speed;
        break;
      case 'top':
        y += speed;
        break;
      case 'down':
        y -= speed;
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
  bullets: function (e) {
    var x = this.refs.bullets.bullet(e, {x: this.state.x, y: this.state.y});
  },
  render: function() {
    var positionCss = {
      transition: 'transform 0.05s linear',
      transform: 'translate(' + this.state.x + 'px,' + this.state.y + 'px)'
    }
    return (
      <g style={positionCss} onClick={this.bullets}>
        <GrassField />
        <Hero />
        <Bullets ref="bullets" />
        <Bush x="1000" y="1900"/>
        <Bush x="1900" y="1200"/>
      </g>
    );
  }
});
