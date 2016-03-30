import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import WolferXApp from './apps/WolferX/WolferX'
import OneColumnLayout from './layouts/OneColumnLayout/OneColumnLayout'
import HomeView from './views/HomeView/HomeView'
import BlogView from './views/BlogView'
import PriceView from './views/CounterView'
import PostView from './views/PostView'
import TestView from './views/TestView'

import AuthRequiredWrapper from './containers/AuthRequiredWrapper'
import ProtectedView from './views/ProtectedView'

export default (store) => (
  <Route path='/' component = { WolferXApp }>
    <Route component = { OneColumnLayout }>
      <IndexRoute component = { HomeView } />
      <Route path='/blog' component = { BlogView } />
      <Route path='/counter' component = { PriceView } />
      <Route path='/post' component = { PostView } />
      <Route path='/test' component = { TestView } />
      <Route component = { AuthRequiredWrapper } >
        <Route path='/protected' component = { ProtectedView }/>
      </Route>
      <Redirect from='*' to='/' />
    </Route>
  </Route>
)
