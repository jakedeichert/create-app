import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppRoot from 'components/AppRoot';
import { store } from 'store/init';

render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  document.getElementById('app')
);
