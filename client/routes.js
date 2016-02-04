import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import WolferXApp from './apps/WolferX'
import OneColumnLayout from './layouts/OneColumnLayout'
import HomeView from './views/HomeView'
import PriceView from './views/CounterView'
import DocChefView from './views/DocChefView'
import TestView from './views/TestView'

import AuthRequiredWrapper from './containers/AuthRequiredWrapper'
import ProtectedView from './views/ProtectedView'

export default (store) => (
  <Route path='/' component = { WolferXApp }>
    <Route component = { OneColumnLayout }>
      <IndexRoute component = { HomeView } />
      <Route path='/counter' component = { PriceView } />
      <Route path='/docchef' component = { DocChefView } />
      <Route path='/test' component = { TestView } />
      <Route component = { AuthRequiredWrapper } >
        <Route path='/protected' component = { ProtectedView }/>
      </Route>
      <Redirect from='*' to='/' />
    </Route>
  </Route>
)
