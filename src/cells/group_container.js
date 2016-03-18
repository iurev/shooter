import { connect } from 'react-redux'
import us from 'underscore'
import { CellsPresenter } from './group_presenter.js'

const mapStateToProps = (state) => {
  return {
    cells: state.cells
  }
}

const Cells = connect(mapStateToProps, null)(CellsPresenter)

export default Cells
