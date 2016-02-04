import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './Login.scss'
import { actions as authActions } from '../../redux/modules/auth'

class Login extends React.Component {

  static propTypes = {
    statusText: PropTypes.string.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
  }

  submitHandler(e) {
    e.preventDefault()
    e.stopPropagation()
    const email = $('#login-input-email').val()
    const password = $('#login-input-password').val()
    this.props.loginUser(email, password)
  }

  inputHandler(e) {
    e.stopPropagation()
  }

  render() {
    return (
      <div className={classes.loginContainer}>
        <h3 className={classes.statusText} >Log In</h3>
        <p className={classes.statusText}>Hint: hello@test.com / test</p>
        {this.props.statusText ? <div className={`alert alert-info`}>{this.props.statusText}</div> : ''}
        <form role='form'>
          <div className='form-group'>
            <input id='login-input-email'
                   type='text'
                   onClick={ this.inputHandler.bind(this) }
                   className='form-control input-lg'
                   placeholder='Email' />
          </div>
          <div className='form-group'>
            <input id='login-input-password'
                   type='password'
                   onClick={ this.inputHandler.bind(this) }
                   className='form-control input-lg'
                   placeholder='Password' />
          </div>
          <button type='submit'
                  className='btn btn-lg'
                  disabled={ this.props.isRequesting }
                  onClick={ this.submitHandler.bind(this) }>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isRequesting : state.auth.isRequesting,
  statusText : state.auth.statusText,
  user : state.auth.user
})

export default connect(mapStateToProps, authActions)(Login)
