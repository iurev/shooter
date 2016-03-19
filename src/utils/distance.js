const distance = (point1, point2) => {
  var x = point1.x - point2.x
  var y = point1.y - point2.y
  return Math.sqrt(x*x + y*y)
}

export default distance
