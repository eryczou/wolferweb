import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SidebarActions from '../actions/sidebar'

import Login from '../components/Login'

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.showSidebar = this.showSidebar.bind(this);
  }

  showSidebar(toggleState) {
    return (
      <div className={ 'wfx-sidebar ' + (toggleState?'wfx-show':'wfx-hidden')} onClick={this.props.toggle} >
        <Login />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.showSidebar(this.props.display)}
      </div>
  )
  }
}

function mapStateToProps(state) {
  return {
    display: state.sidebar.toggle
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SidebarActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

