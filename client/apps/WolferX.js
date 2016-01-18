import React from 'react';
// jquery and bootstrap are not supporting es6
global.$ = global.jQuery = require('jquery')
require('bootstrap-sass')
import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap-sprockets.scss'
import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import '../styles/main.scss'
import Sidebar from '../containers/Sidebar/Sidebar'

class WolferX extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired
  };

  render() {
    return (
      <div className='wfx-app-container wfx-theme-sciFiDark'>
        <Sidebar />
        {this.props.children}
      </div>
    );
  }
}

export default WolferX;
