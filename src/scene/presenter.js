import React, { PropTypes } from 'react'

import Cells from '../cells/group_container'
import Hero from '../hero/container'
import Bush from '../bush'
import Bullets from '../bullets/group_container'
import Monsters from '../monsters/group_container'

const ScenePresenter = ({ position, onClick }) => {
  var positionCss = {
    transform: `translate(${position.x}px, ${position.y}px)`
  }
  return (
    <g id="scene_presenter"
      style={positionCss}
      onMouseDown={(e) => {
        onClick({
          clientX: e.clientX,
          clientY: e.clientY
        })
      }} >
      <Cells />
      <Hero />
      <Monsters />
      <Bullets />
    </g>
  )
}

ScenePresenter.propTypes = {
  position: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ScenePresenter;
