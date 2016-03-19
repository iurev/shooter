import us from 'underscore'
import randomColor from './utils/random_color'
import distance from './utils/distance'

var map = []
var size = 100
var earthPoints = []

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

const fillMapWithWater = () => {
  us(size).times((xIndex) => {
    map.push([])
    us(size).times((yIndex) => {
      var row = us(map).last()
      var cellType = 'water'
      row.push({
        xIndex,
        yIndex,
        id: uniqKey(xIndex, yIndex),
        cellType,
        fill: getColorByType(cellType)
      })
    })
  })
}

const genNewPoint = () => {
  if(earthPoints.length) {
    var newPoint = {
      x: us(earthPoints).last().x,
      y: us(earthPoints).last().y,
    }
  } else {
    let edge = Math.floor(size/3)
    var newPoint = {
      x: us.random(edge, size-edge),
      y: us.random(edge, size-edge)
    }
    earthPoints.push(newPoint)
  }
  return newPoint
}

const updatePointByDirection = (point) => {
  const directions = ['top', 'bottom', 'left', 'right']
  var direction = us(directions).sample()
  var coeff = us.random(1, 10)

  switch (direction) {
    case 'top':
      point.y += coeff
      break;
    case 'bottom':
      point.y -= coeff
      break;
    case 'left':
      point.x += coeff
      break;
    case 'right':
      point.x -= coeff
      break;
  }
  return point
}

const generateEarthPoints = () => {
  us(300).times(() => {
    var newPoint = genNewPoint()
    newPoint = updatePointByDirection(newPoint)
    earthPoints.push(newPoint)
  })
}

const updateCellsTypes = () => {
  us(earthPoints).each((point, index) => {
    us(size).times((xIndex) => {
      var row = map[xIndex]
      us(size).times((yIndex) => {
        var cellType
        var cell = row[yIndex]
        var dist = distance({
          x: xIndex*100,
          y: yIndex*100
        }, {
          x: point.x*100,
          y: point.y*100,
        })
        var dist2 = distance({
          x: earthPoints[0].x,
          y: earthPoints[0].y
        }, {
          x: point.x*100,
          y: point.y*100,
        })

        var coeffSand = (20 / dist) * (20 / dist2) * 200
        if((coeffSand >= 0.02)) {
          cellType = 'sand'
        }

        var coeffGrass = 18 / dist
        if((coeffGrass >= 0.02)) {
          cellType = 'grass'
        }

        if(!cellType) cellType = cell.cellType
        cell.cellType = cellType
        cell.fill = getColorByType(cellType)
      })
    })
  })
}

const generateRandomIsland = () => {
  generateEarthPoints()
  updateCellsTypes()
}

fillMapWithWater()
generateRandomIsland()

const Map = map

export var heroPosition =  {
  x: earthPoints[0].x*100,
  y: earthPoints[0].x*100
}

export default Map
