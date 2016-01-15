import React, { PropTypes } from 'react'
import { Motion, spring } from 'react-motion'
import { connect } from 'react-redux'

// jquery and bootstrap are not supporting es6
//global.$ = global.jQuery = require('jquery');
//require('bootstrap-sass');
//import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap-sprockets.scss';
//import '../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../styles/main.scss';
import Navbar from '../components/Navbar'
import Sidebar from '../containers/Sidebar/Sidebar'

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
    let layoutWidth = layout.offsetWidth;
    this.setState({
      layoutWidth
    });
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
      <div ref='layout' className='wfx-layout-container'>
        <Navbar />
        <Sidebar />
        <Motion style={{ sidebarWidth: spring(this.props.isSidebarToggled? 40 : 270, [150, 15]) }}>
          {
            ({ sidebarWidth }) =>
              <div className='container wfx-view-container'
                   style={{ 'paddingRight': sidebarWidth }}>
                <div className='row'>
                  <div className='col-md-10 col-md-offset-1'>
                    { this.props.children }
                  </div>
                </div>
              </div>
          }
        </Motion>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isSidebarToggled: state.sidebar.isToggled
  }
}

export default connect(mapStateToProps)(OneColumnLayout);

