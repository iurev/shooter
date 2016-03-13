import { connect } from 'react-redux'
import HeroPresenter from './presenter.js'

const mapStateToProps = (state) => {
  return {
    position: state.heroPosition
  }
}

const Hero = connect(mapStateToProps, null)(HeroPresenter)

export default Hero
