import MonsterPresenter from './presenter'
import React, { PropTypes } from 'react'

export const MonstersPresenter = ({monsters}) => {
  var monstersDOM = monsters.map(function (monster, index) {
    return MonsterPresenter({monster: monster});
  })
  return (
    <g>
      {monstersDOM}
    </g>
  )
}

MonstersPresenter.propTypes = {
  monsters: PropTypes.array.isRequired
}
