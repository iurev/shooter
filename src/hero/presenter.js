import React, { PropTypes } from 'react'

const heroCss = {
  cx: 0,
  cy: 0,
  fill: '#441537',
  strokeWidth: 1,
  stroke:'rgb(0,0,0)',
  r: 40
}

const HeroPresenter = ({position}) => {
  var positionCss = {
    transform: `translate(${position.x}px, ${position.y}px)`
  }
  return (
    <g style={positionCss}>
      <circle style={heroCss} />
    </g>
  )
}

HeroPresenter.propTypes = {
  position: PropTypes.object.isRequired
}

export default HeroPresenter
