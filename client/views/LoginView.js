import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import reactMixin from 'react-mixin'
import linkedStateMixin from 'react-addons-linked-state-mixin'
import { actions as authActions } from '../redux/modules/auth'

export class LoginView extends React.Component {

  static propTypes = {
    statusText: PropTypes.string.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.next || '/login';
    this.state = {
      email: '',
      password: '',
      redirectTo: redirectRoute
    };
  }

  login(e) {
    e.preventDefault();
    this.props.loginUser(this.state.email, this.state.password, this.state.redirectTo);
  }

  render () {
    return (
      <div className='col-xs-12 col-md-6 col-md-offset-3'>
        <h3>Log in to view protected content!</h3>
        <p>Hint: hello@test.com / test</p>
        {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
        <form role='form'>
          <div className='form-group'>
            <input type='text'
                   className='form-control input-lg'
                   valueLink={this.linkState('email')}
                   placeholder='Email' />
          </div>
          <div className='form-group'>
            <input type='password'
                   className='form-control input-lg'
                   valueLink={this.linkState('password')}
                   placeholder='Password' />
          </div>
          <button type='submit'
                  className='btn btn-lg'
                  disabled={this.props.isAuthenticating}
                  onClick={this.login.bind(this)}>Submit</button>
        </form>
        <Link to='/protected' >Protected</Link>
      </div>
    );
  }
}

reactMixin(LoginView.prototype, linkedStateMixin);

const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText
});

export default connect(mapStateToProps, authActions)(LoginView);
