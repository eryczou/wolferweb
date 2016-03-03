import React, { PropTypes } from 'react'
import { Motion, spring } from 'react-motion'
import { connect } from 'react-redux'
import classes from './OneColumnLayout.scss'
import MainHeader from '../../components/MainHeader/MainHeader'
import Navbar from '../../components/Navbar/Navbar'
import { actions as SidebarActions } from '../../redux/modules/sidebar'


class OneColumnLayout extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    isSidebarToggled: PropTypes.bool.isRequired
  };

  showSidebar(e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.showSidebar()
  }

  render() {

    const { isSidebarToggled } = this.props

    const showSidebarToggler = (isSidebarToggled) => {
      if (isSidebarToggled) {
        return (
          <span className={`glyphicon glyphicon-list ${ classes.sidebarToggler }`}
                onClick={ this.showSidebar.bind(this) } ></span>
        )
      }
    }

    return (
      <Motion style={{ sidebarWidth: spring(this.props.isSidebarToggled? 0 : 330, [120, 15]) }}>
        {
          (val) =>
            <div className={ classes.layoutContainer } style={{ 'paddingRight': val.sidebarWidth }}>
              <div className={ classes.viewContainer }>
                <header className={ classes.headerContainer }>
                  { showSidebarToggler(isSidebarToggled) }
                  <MainHeader title='WolferX' subTitle='... life is sole, make it bloom and cheer it with the one loved' />
                  <Navbar />
                </header>
                <div className={ classes.bodyContainer }>
                  {this.props.children}
                </div>
              </div>
            </div>
        }
      </Motion>
    )
  }
}

function mapStateToProps(state) {
  return {
    isSidebarToggled: state.sidebar.isToggled
  }
}

export default connect(mapStateToProps, SidebarActions)(OneColumnLayout)

