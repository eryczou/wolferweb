import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './store/configureStore'

const historyConfig = { basename: __BASENAME__ }
const history = useRouterHistory(createHistory)(historyConfig)

const initialState = window.__INITIAL_STATE__
const store = configureStore({ initialState, history })

ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
