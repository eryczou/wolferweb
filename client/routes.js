import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import WolferXApp from './apps/WolferX';
import OneColumnLayout from './layouts/OneColumnLayout';

import HomePage from './views/HomeView';
import PricePage from './views/PriceView';

export default (
  <Route path='/' component={WolferXApp}>
    <Route component={OneColumnLayout}>
      <IndexRoute component={HomePage} />
      <Route path='/price' component={PricePage} />
      <Redirect from='*' to='/' />
    </Route>
  </Route>
);
