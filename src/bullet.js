var React = require('react');
var ReactDOM = require('react-dom');
var randomColor = require('./utils/random_color').default;

export var Bullet = React.createClass({
  getInitialState: function() {
    var translate = `translate(${this.props.tX}px, ${this.props.tY}px)`
    var inState = {
      key: Math.random(),
      groupStyle: {
        transform: `translate(${this.props.x}px, ${this.props.y}px)`,
        transition: 'transform 1s ease-out',
      },
      circleStyle: {
        x: 0,
        y: 0,
        fill: randomColor(211,59,77),
        strokeWidth: 0,
        stroke:'rgb(0,0,0)',
        r: 10,
      }
    };
    var that = this;

    setTimeout(function () {
      var newState = JSON.parse(JSON.stringify(inState));
      newState.groupStyle.transform = translate;
      that.setState(newState);
      that.forceUpdate();
    }, 1);
    return inState;
  },
  render: function() {
    // console.log('render');
    // console.log(this.state);
    return (
      <g key={this.state.key} style={this.state.groupStyle}>
        <circle style={this.state.circleStyle} />
      </g>
    );
  }
});
