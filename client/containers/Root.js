import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
// jquery and bootstrap are not supporting es6
global.$ = global.jQuery = require('jquery');
require('bootstrap-sass');
import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap-sprockets.scss';
import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../styles/main.scss';

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired
  };

  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  get devTools () {
    if (__DEBUG__) {
      if (window.devToolsExtension) {
        //window.devToolsExtension.open();
      } else {
        const DevTools = require('./DevTools').default;
        return <DevTools />
      }
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          {this.content}
          {this.devTools}
        </div>
      </Provider>
    )
  }
}
