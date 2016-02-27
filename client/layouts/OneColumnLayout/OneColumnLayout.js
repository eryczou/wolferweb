import React, { PropTypes } from 'react'
import { Motion, spring } from 'react-motion'
import { connect } from 'react-redux'
import classes from './OneColumnLayout.scss'
import PageHeader from '../../components/PageHeader/PageHeader'
import Navbar from '../../components/Navbar/Navbar'

class OneColumnLayout extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    isSidebarToggled: PropTypes.bool.isRequired
  };

  render() {
    return (
      <Motion style={{ sidebarWidth: spring(this.props.isSidebarToggled? 40 : 330, [120, 15]) }}>
        {
          (val) =>
            <div className='wfx-layout-container' style={{ 'paddingRight': val.sidebarWidth }}>
              <div className='container wfx-view-container'>
                <header className={ classes.header }>
                  <PageHeader title='WolferX' subTitle='... life is sole, make it bloom and cheer it with the one loved' />
                  <Navbar />
                </header>
                <div className='row'>
                  <div className='col-md-10 col-md-offset-1'>
                    {this.props.children}
                  </div>
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

export default connect(mapStateToProps)(OneColumnLayout)

