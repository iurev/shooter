var React = require('react');
import { render } from 'react-dom';
import Screen from './screen';
import { Provider } from 'react-redux'
import { Store } from './store'
import { keyPressAction, frameAction } from './scene/actions.js'

document.onkeydown = function(e) {
  Store.dispatch(keyPressAction(e.keyCode));
}

var callback = function() {
  Store.dispatch(frameAction());
  window.requestAnimationFrame(callback)
}

window.requestAnimationFrame(callback)

render(
  <Provider store={Store}>
    <Screen />
  </Provider>,
  document.getElementById('example')
);
