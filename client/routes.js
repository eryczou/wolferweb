import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import WolferXApp from './apps/WolferX';
import OneColumnLayout from './layouts/OneColumnLayout';
import HomeView from './views/HomeView';
import PriceView from './views/PriceView';

export default (
  <Route path='/' component={ WolferXApp }>
    <Route component={ OneColumnLayout }>
      <IndexRoute component={HomeView} />
      <Route path='/price' component={PriceView} />
      <Redirect from='*' to='/' />
    </Route>
  </Route>
);
