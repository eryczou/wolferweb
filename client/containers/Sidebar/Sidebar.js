import React, { PropTypes } from 'react'
import { Motion, spring } from 'react-motion'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SidebarActions from '../../actions/sidebar'
import classes from './sidebar.scss'
import Login from '../Login/Login'

class Sidebar extends React.Component {

  static propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
    isToggled: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props)
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
    this.state = {
      isHovering: false
    }
  }

  toggleSidebar(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.toggleSidebar()
    this.setState({ isHovering: false })
  }

  onMouseOver(e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ isHovering: true })
  }

  onMouseOut(e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ isHovering: false })
  }

  render() {

    let { isToggled } = this.props;
    let { isHovering } = this.state;

    let sidebarClass = classes.sidebar + ' '
      + (isToggled && isHovering? classes.onHovering : '')

    let toggleButtonClass = 'glyphicon glyphicon-expand '
      + (isToggled? 'fa-flip-horizontal ' : '')
      + classes.toggleButton

    return (
      <Motion style={{ sidebarWidth: spring(isToggled? 40 : 270, [150, 15]) }} >
        {
          ({ sidebarWidth }) =>
            <div className={ sidebarClass }
                 onClick={ this.toggleSidebar }
                 onMouseOver= { this.onMouseOver }
                 onMouseOut= { this.onMouseOut }
                 style={{ width: sidebarWidth }} >
              <div className={ classes.header }>
                <i className={ toggleButtonClass } aria-hidden='true'></i>
              </div>
              <Login />
            </div>
        }
      </Motion>
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

