import React from 'react'
import '../../styles/main.scss'
import classes from './WolferX.scss'
import Sidebar from '../../containers/Sidebar/Sidebar'

class WolferX extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired
  };

  render() {
    return (
      <div className={ classes.appContainer }>
        <Sidebar />
        {this.props.children}
      </div>
    )
  }
}

export default WolferX
