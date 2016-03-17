import { connect } from 'react-redux'
import { MonstersPresenter } from './group_presenter.js'

const mapStateToProps = (state) => {
  return {
    monsters: state.monsters
  }
}

const Monsters = connect(mapStateToProps, null)(MonstersPresenter)

export default Monsters
