import { BulletPresenter } from './one_presenter'
import React, { PropTypes } from 'react'

export const BulletsPresenter = ({bullets}) => {
  var bulletsDOM = bullets.map(function (bullet, index) {
    return BulletPresenter(bullet);
  })
  return (
    <g>
      {bulletsDOM}
    </g>
  )
}

BulletsPresenter.propTypes = {
  bullets: PropTypes.array.isRequired
}
