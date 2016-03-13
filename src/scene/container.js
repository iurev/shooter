import { connect } from 'react-redux'
import ScenePresenter from './presenter.js'
import { keyPressAction, onClickAction } from './actions.js'
import { Store } from '../store'

const mapStateToProps = (state) => {
  return {
    position: state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: function(e) {
      dispatch(onClickAction(e));
    }
  }
}

document.onkeydown = function(e) {
  Store.dispatch(keyPressAction(e.keyCode));
}

const Scene = connect(mapStateToProps, mapDispatchToProps)(ScenePresenter)

export default Scene
