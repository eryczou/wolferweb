import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';
import { services as authServices } from '../redux/modules/auth'

class AuthRequiredView extends React.Component {

  static propTypes = {
    children: PropTypes.elem.isRequired
  };

  constructor (props) {
    super(props)
    this.checkAuth.bind(this)
  }

  componentWillMount () {
    if(!authServices.isLoggedIn()){
      routeActions.push('/login')
    }
  }

  render () {
    return (
      <div>
        {this.props.isAuthenticated === true
          ? <Component {...this.props}/>
          : null
        }
      </div>
    )

  }

}


const mapStateToProps = (state) => ({
  token: state.auth.token,
  userName: state.auth.userName,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(AuthRequiredView)

