import React, { PropTypes } from 'react'

const styles = {
  cx: 0,
  cy: 0,
  fill: '#ff2b00',
  strokeWidth: 1,
  stroke:'rgb(0,0,0)',
  r: 40
}

const MonsterPresenter = ({monster}) => {
  var positionCss = {
    transform: `translate(${monster.x}px, ${monster.y}px)`
  }
  return (
    <g key={monster.id} style={positionCss}>
      <circle style={styles} />
    </g>
  )
}

MonsterPresenter.propTypes = {
  position: PropTypes.object.isRequired
}

export default MonsterPresenter
