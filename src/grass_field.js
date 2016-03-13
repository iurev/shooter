var React = require('react');
var ReactDOM = require('react-dom');
var keyboardJS = require('keyboardjs');
var us = require('underscore');
var map = require('./map.json');
var Bush = require('./bush').Bush;
var Grass = require('./grass').Grass;
var Bullet = require('./bullet').Bullet;
var HeroModule = require('./hero');
var Hero = HeroModule.Hero;
var HeroPosition = HeroModule.HeroPosition;
var Paper = require('paper');
var Point = Paper.Point;

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
      x: 0,
      y: 0,
      grasses,
      bullets: []
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
  bullet: function(e) {
    // debugger
    // var state = Immutable.Map(this.state);
    // var newBullets = Immutable.List.of(...this.state.bullets);
    var newBullets = this.state.bullets.slice();
    var targetX = e.clientX - this.state.x;
    var targetY = e.clientY - this.state.y;
    var xPoint = targetX - HeroPosition.x;
    var yPoint = targetY - HeroPosition.y;
    var point = new Point(xPoint, yPoint);
    // console.log(point);
    point.length = 1000;
    // console.log(point);
    targetX = point.x + HeroPosition.x;
    targetY = point.y + HeroPosition.y;
    newBullets.push(
      (
        <Bullet x={HeroPosition.x} y={HeroPosition.y} tX={targetX} tY={targetY} key={Math.random()}/>
      )
    )
    // console.log(newBullets);
    // var newState = state.set('bullets', newBullets);
    // console.log(newState.toObject());
    this.setState({bullets: newBullets});
    // console.log(this.state);
  },
  render: function() {
    // console.log('render grass field');
    var positionCss = {
      transition: 'transform 0.05s linear',
      transform: 'translate(' + this.state.x + 'px,' + this.state.y + 'px)'
    }
    // console.log(this.state);
    return (
      <svg width="100%" height="100%" onKeyDown={this.onKeyDown} key="1" onClick={this.bullet}>
        <g style={positionCss}>
          {this.state.grasses}
          <Hero />
          {this.state.bullets}
          <Bush x="1000" y="1900"/>
          <Bush x="1900" y="1200"/>
        </g>
      </svg>
    );
  }
});
