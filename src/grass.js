var React = require('react');
var randomColor = require('./utils/random_color').default;
var map = require('./map.json');

export var Grass = React.createClass({
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
    // console.log('render grass');
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
