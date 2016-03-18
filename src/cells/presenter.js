import React, { PropTypes } from 'react'

const width = 100
const height = 100

const rectStyle = (cell) => {
  return {
    fill: cell.fill,
    strokeWidth: 0,
    stroke:'rgb(0,0,0)',
    x: cell.xIndex * width,
    y: cell.yIndex * height
  }
}

const CellPresenter = (cell) => {
  return (
    <rect width={width} height={height} style={rectStyle(cell)} key={cell.id} />
  )
}

CellPresenter.propTypes = {
  cell: PropTypes.object.isRequired
}

export default CellPresenter
