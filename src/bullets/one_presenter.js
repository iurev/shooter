import React, { PropTypes } from 'react'

export const BulletPresenter = (bullet) => {
  var groupStyle = {
    transform: `translate(${bullet.x}px, ${bullet.y}px)`,
    transition: 'transform 1s ease-out',
  }
  var circleStyle = {
    x: 0,
    y: 0,
    fill: bullet.fill,
    strokeWidth: 0,
    stroke:'rgb(0,0,0)',
    r: 10,
  }
  return (
    <g key={bullet.id} style={groupStyle}>
      <circle style={circleStyle} />
    </g>
  )
}
