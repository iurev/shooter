import CellPresenter from './one_presenter'
import React, { PropTypes } from 'react'

export const CellsPresenter = ({cells}) => {
  var cellsDOM = cells.map(function (cell) {
    return CellPresenter(cell);
  })
  return (
    <g>
      {cellsDOM}
    </g>
  )
}

CellsPresenter.propTypes = {
  cells: PropTypes.array.isRequired
}
