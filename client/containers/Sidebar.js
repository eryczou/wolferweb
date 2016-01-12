import React from 'react';
import { Motion, spring } from 'react-motion';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SidebarActions from '../actions/sidebar'

import Login from '../components/Login'

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.showSidebar = this.showSidebar.bind(this);
  }

  toggleSidebar(e) {
    this.props.toggleSidebar();
    e.preventDefault();
  }

  showSidebar(isToggled) {
    return (
      <Motion style={{ width: spring(this.props.isToggled? 40 : 270, [150, 15]) }} >
        {
          ({width}) =>
            <div className='wfx-sidebar'
                 onClick={this.toggleSidebar}
                 style={{ width }} >
              <Login />
            </div>
        }
      </Motion>
    );
  }

  render() {
    return (
      <div>
        {this.showSidebar(this.props.isToggled)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isToggled: state.sidebar.isToggled
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SidebarActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

