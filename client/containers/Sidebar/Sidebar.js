import React, { PropTypes } from 'react'
import { Motion, spring } from 'react-motion'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SidebarActions from '../../actions/sidebar'
import classes from './Sidebar.scss';
import ChevronLeftIcon from '../../static/img/elements/chevron-left-512px.svg';

import Login from '../../components/Login'

class Sidebar extends React.Component {

  static propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
    isToggled: PropTypes.bool.isRequired
  };

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
      <Motion style={{ sidebarWidth: spring(isToggled? 40 : 270, [150, 15]) }} >
        {
          ({ sidebarWidth }) =>
            <div className='wfx-sidebar'
                 onClick={this.toggleSidebar}
                 style={{ width: sidebarWidth }} >
              <div>
                <img className={classes['wfx-sidebar-chevronLeft']} src={ ChevronLeftIcon } />
              </div>
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

