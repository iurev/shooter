import us from 'underscore'
import randomColor from './utils/random_color'

var size = 100

const indexToString = (index) => {
  var length = size.toString().length
  var string = index.toString()
  var prefix = us.range(3-string.length).map(() => "0").join("")
  return prefix + string;
}

const uniqKey = (xIndex, yIndex) => {
  return indexToString(xIndex) + indexToString(yIndex)
}

const getColorByType = (cellType) => {
  switch (cellType) {
    case 'grass':
      return randomColor(29,156,73)
      break;
    case 'sand':
      return randomColor(240,231,0)
      break;
    case 'water':
      return randomColor(85,134,240)
      break;
  }
}

var map = []
us(size).times((xIndex) => {
  map.push([])
  us(size).times((yIndex) => {
    var row = us(map).last()
    row.push({
      xIndex,
      yIndex,
      id: uniqKey(xIndex, yIndex),
      cellType: 'grass',
      fill: getColorByType('grass')
    })
  })
})

const Map = map

export default Map
