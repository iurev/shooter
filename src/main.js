var React = require('react');
import { render } from 'react-dom';
import Screen from './screen';
import { Provider } from 'react-redux'
import { Store } from './store'

render(
  <Provider store={Store}>
    <Screen />
  </Provider>,
  document.getElementById('example')
);
