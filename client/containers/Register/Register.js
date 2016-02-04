import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './Register.scss'
import { actions as authActions } from '../../redux/modules/auth'

class Register extends React.Component {

  static propTypes = {
    isRegistering: PropTypes.bool.isRequired,
    statusText: PropTypes.string.isRequired,
    registerUser: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
  }

  submitHandler(e) {
    const { registerUser } = this.props

    e.preventDefault()
    e.stopPropagation()
    const email = $('#login-input-email').val()
    const password = $('#login-input-password').val()
    registerUser(email, password)
  }

  inputHandler(e) {
    e.stopPropagation()
  }

  render() {

    const { isRegistering, statusText } = this.props

    return (
      <div className={classes.loginContainer}>
        <h3 className={classes.statusText} >Log In</h3>
        <p className={classes.statusText}>Hint: hello@test.com / test</p>
        {statusText ? <div className={`alert alert-info`} >{ statusText }</div> : ''}
        <form role='form'>
          <div className='form-group'>
            <input id='register-input-email'
                   type='text'
                   onClick={ this.inputHandler.bind(this) }
                   className='form-control input-lg'
                   placeholder='Email' />
          </div>
          <div className='form-group'>
            <input id='register-input-password'
                   type='password'
                   onClick={ this.inputHandler.bind(this) }
                   className='form-control input-lg'
                   placeholder='Password' />
          </div>
          <button type='submit'
                  className='btn btn-lg'
                  disabled={ isRegistering }
                  onClick={ this.submitHandler.bind(this) }>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isRegistering : state.auth.isRegistering,
  statusText : state.auth.statusText,
  user : state.auth.user
})

export default connect(mapStateToProps, authActions)(Register)
