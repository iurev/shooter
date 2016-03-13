import { createStore } from 'redux'
import reducer from './scene/reducer'

export var Store = createStore(reducer);

