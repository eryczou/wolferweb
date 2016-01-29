import React, { PropTypes } from 'react'
import { Motion, spring } from 'react-motion'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar/Navbar'

class OneColumnLayout extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    isSidebarToggled: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.handleWindowResize.bind(this);

    this.state = {
      layoutWidth: -1
    };
  }

  handleWindowResize() {
    let layout = this.refs.layout;
  }

  componentDidMount() {
    window.addEventListener( 'resize', this.handleWindowResize.bind(this) );
    this.handleWindowResize();
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {
    window.removeEventListener( 'resize', this.handleWindowResize.bind(this) );
  }

  render() {
    return (
        <Motion style={{ sidebarWidth: spring(this.props.isSidebarToggled? 40 : 330, [120, 15]) }}>
          {
            (val) =>
              <div className='wfx-layout-container'
                   style={{ 'paddingRight': val.sidebarWidth }}>

                <Navbar paddingRight={val.sidebarWidth} />

                <div className='container wfx-view-container'>
                  <div className='row'>
                    <div className='col-md-10 col-md-offset-1'>
                      { this.props.children }
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

export default connect(mapStateToProps)(OneColumnLayout);

