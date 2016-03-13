import { createStore } from 'redux'
import reducerKeyPress from './scene/reducer'
export var Store = createStore(reducerKeyPress);
