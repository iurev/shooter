var React = require('react');
var keyboardJS = require('keyboardjs');
var us = require('underscore');

var map = JSON.parse(localStorage.getItem('map')) || [];
window.wwjuMap = map;
// types: sand, grass, water

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
        return this.randomColor()
        break;
      case 'sand':
        return this.randomColor(240,231,0)
        break;
      case 'water':
        return this.randomColor(85,134,240)
        break;
    }
  },
  randomColor: function(red=29, green=156, blue=73) {
    red = red + us.random(-10, 10)
    green = green + us.random(-10, 10)
    blue = blue + us.random(-10, 10)
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
  },
  changeType: function() {
    var nextCellType = '';
    switch (this.state.cellType) {
      case 'grass':
        nextCellType = 'sand';
        break;
      case 'sand':
        nextCellType = 'water';
        break;
      case 'water':
        nextCellType = 'grass';
        break;
    }
    // nextCellType = 'sand';
    // debugger
    map[this.props.xIndex][this.props.yIndex].cellType = nextCellType;
    localStorage.setItem('map', JSON.stringify(map));
    // console.log(nextCellType);
    // console.log(this.randomColor(this.getColorByType(nextCellType)));
    this.setState(
      {
        cellType: nextCellType,
        fill: this.getColorByType(nextCellType)
      }
    );
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
      <rect width={width} height={height} style={rectStyle} onClick={this.changeType} />
    );
  }
});


var GrassField = React.createClass({
  getInitialState: function() {
    var grasses = us.range(30).map(function (_, xIndex) {
      map.push([]);
      var row = us.last(map);
      return us.range(30).map(function (_, yIndex) {
        var xString = xIndex.toString();
        xString = us.range(3-xString.length).map(function() {return "0";}).join("") + xString;
        var yString = yIndex.toString();
        yString = us.range(3-yString.length).map(function() {return "0";}).join("") + yString;
        var key = xString + yString;
        row.push({
          xIndex: xIndex,
          yIndex: yIndex,
          cellType: 'grass'
        })
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
      </svg>
    );
  }
});

ReactDOM.render(
  <GrassField />,
  document.getElementById('example')
);
