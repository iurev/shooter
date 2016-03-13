import { connect } from 'react-redux'
import { BulletsPresenter } from './group_presenter.js'

const mapStateToProps = (state) => {
  return {
    bullets: state.bullets
  }
}

const Bullets = connect(mapStateToProps, null)(BulletsPresenter)

export default Bullets
