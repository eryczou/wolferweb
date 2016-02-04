import React from 'react'
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
    )
  }
}

export default WolferX
