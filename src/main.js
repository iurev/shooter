var React = require('react');
import { render } from 'react-dom';
import Screen from './screen';
import { Provider } from 'react-redux'
import { Store } from './store'
import { keyPressAction, frameAction } from './scene/actions.js'
import Key from './key.js'

var callback = function() {
  Store.dispatch(frameAction());
  window.requestAnimationFrame(callback)
  Key.pressed().forEach(function(keyCode) {
    Store.dispatch(keyPressAction(keyCode))
  })
}

window.requestAnimationFrame(callback)

render(
  <Provider store={Store}>
    <Screen />
  </Provider>,
  document.getElementById('example')
);
