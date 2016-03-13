import React, { PropTypes } from 'react'

import GrassField from '../grass_field'
import Hero from '../hero/container'
import Bush from '../bush'

const ScenePresenter = ({ position, onClick }) => {
  var positionCss = {
    transition: 'transform 0.05s linear',
    transform: `translate(${position.x}px, ${position.y}px)`
  }
  return (
    <g id="scene_presenter" style={positionCss} onClick={onClick} >
      <GrassField />
      <Hero />
    </g>
  )
}

ScenePresenter.propTypes = {
  position: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ScenePresenter;
