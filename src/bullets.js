var React = require('react');
var Point = require('paper').Point;
var Bullet = require('./bullet').Bullet;
var HeroPosition = require('./hero').HeroPosition;

var Bullets = React.createClass({
  getInitialState: function() {
    return {
      bullets: []
    };
  },
  bullet: function(e, scene) {
    console.log('asdf');
    var newBullets = this.state.bullets.slice();
    var targetX = e.clientX - scene.x;
    var targetY = e.clientY - scene.y;
    var xPoint = targetX - HeroPosition.x;
    var yPoint = targetY - HeroPosition.y;
    var point = new Point(xPoint, yPoint);
    point.length = 1000;
    targetX = point.x + HeroPosition.x;
    targetY = point.y + HeroPosition.y;
    newBullets.push(
      (
        <Bullet x={HeroPosition.x} y={HeroPosition.y} tX={targetX} tY={targetY} key={Math.random()}/>
      )
    )
    this.setState({bullets: newBullets});
  },
  render: function() {
    var style = {
      width: "100%",
      height: "100%"
    }
    return (
      <g style={style} onClick={this.bullet}>
        {this.state.bullets}
      </g>
    )
  }
});

export default Bullets
