import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory, useBasename } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import routes from './routes';

const history = useBasename(createHistory)({
  basename: __BASENAME__
});

const store = configureStore(window.__INITIAL_STATE__);

syncReduxAndRouter(history, store, (state) => state.router);

ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
