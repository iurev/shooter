import { connect } from 'react-redux'
import ScenePresenter from './presenter.js'
import { onClickAction } from './actions.js'

const mapStateToProps = (state) => {
  return {
    position: state.scenePosition
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: function(e) {
      dispatch(onClickAction(e));
    }
  }
}

const Scene = connect(mapStateToProps, mapDispatchToProps)(ScenePresenter)

export default Scene
