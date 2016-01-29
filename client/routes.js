import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import WolferXApp from './apps/WolferX'
import OneColumnLayout from './layouts/OneColumnLayout'
import AuthRequiredWrapper from './containers/AuthRequiredWrapper'
import HomeView from './views/HomeView'
import PriceView from './views/PriceView'
import ProtectedView from './views/ProtectedView'

import DocChefView from './views/DocChefView'

export default (
  <Route path='/' component = { WolferXApp }>
    <Route component = { OneColumnLayout }>
      <IndexRoute component = { HomeView } />
      <Route path='/counter' component = { PriceView } />
      <Route path='/docchef' component = { DocChefView } />
      <Route component = { AuthRequiredWrapper } >
        <Route path='/protected' component = { ProtectedView }/>
      </Route>
      <Redirect from='*' to='/' />
    </Route>
  </Route>
);
