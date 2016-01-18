import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import WolferXApp from './apps/WolferX'
import OneColumnLayout from './layouts/OneColumnLayout'
import HomeView from './views/HomeView'
import PriceView from './views/PriceView'
import LoginView from './views/LoginView'
import ProtectedView from './views/ProtectedView'
import { requireAuthentication } from './components/AuthenticatedComponent';


export default (
  <Route path='/' component={ WolferXApp }>
    <Route component={ OneColumnLayout }>
      <IndexRoute component={ HomeView } />
      <Route path='price' component={ PriceView } />
      <Route path='login' component={ LoginView }/>
      <Route path='protected' component={ requireAuthentication(ProtectedView) }/>
      <Redirect from='*' to='/' />
    </Route>
  </Route>
);
