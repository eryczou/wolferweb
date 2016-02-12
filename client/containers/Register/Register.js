import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { TextField, FlatButton } from 'material-ui'

import { isValidEmail } from '../../utils/webUtils'
import Constants from '../../utils/constants'
import classes from './Register.scss'
import { actions as authActions } from '../../redux/modules/auth'

const styles = {
  textFieldStyle: {
    width: '100%',
    height: '62px',
    marginBottom: '5px'
  },
  inputStyle: {
    marginTop: '8px',
    color: 'white'
  },
  floatingLabelStyle: {
    top: '27px',
    color: '#777777'
  },
  errorStyle: {
    position: 'absolute',
    top: '56px'
  },
  underlineStyle: {
    bottom: '9px'
  },
  submitButton: {
    marginTop: '20px',
    paddingLeft: '0px',
    paddingRight: '0px',
    color: 'steelblue',
    fontSize: '20px'
  },
  labelStyle: {
    paddingLeft: '0',
    paddingRight: '0'
  }
}

class Register extends React.Component {

  static propTypes = {
    isRequesting: PropTypes.bool.isRequired,
    statusText: PropTypes.string.isRequired,
    registerUser: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    updateError: PropTypes.func.isRequired,
    removeError: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
  }

  submitHandler(e) {
    e.preventDefault()
    e.stopPropagation()
    const email = $('#register-input-email').val()
    const password = $('#register-input-password').val()
    const repassword = $('#register-input-repassword').val()

    let hasError = false
    if (!isValidEmail(email)) {
      this.props.updateError(Constants.EMAIL_INPUT, Constants.NOT_VALID_EMAIL)
      hasError = true
    }
    if (password != repassword) {
      this.props.updateError(Constants.PASSWORD_CONFIRM_INPUT, Constants.NOT_MATCH_PASSWORD)
      hasError = true
    }

    if (!hasError) {
      this.props.registerUser(email, password)
    }
  }

  inputHandler(e) {
    const { error } = this.props

    e.stopPropagation()
    switch (e.target.name) {
      case 'email':
        if (error.EMAIL_INPUT) {
          this.props.removeError(Constants.EMAIL_INPUT)
        }
        break
      case 'password':
      case 'passwordConfirm':
        if (error.PASSWORD_CONFIRM_INPUT) {
          this.props.removeError(Constants.PASSWORD_CONFIRM_INPUT)
        }
        break
    }
  }

  render() {

    const { isRequesting, statusText, error } = this.props

    return (
      <div className={classes.registerContainer}>
        {statusText ? <p className={classes.statusText}>{statusText}</p> : ''}
        <TextField id='register-input-email'
                   name='email'
                   type='text'
                   autoComplete='off'
                   style={styles.textFieldStyle}
                   inputStyle={styles.inputStyle}
                   floatingLabelStyle={styles.floatingLabelStyle}
                   errorStyle={styles.errorStyle}
                   underlineStyle={styles.underlineStyle}
                   floatingLabelText='Email'
                   errorText={error.EMAIL_INPUT? error.EMAIL_INPUT : ''}
                   onClick={this.inputHandler.bind(this)}
        />
        <TextField id='register-input-password'
                   name='password'
                   type='password'
                   autoComplete='off'
                   style={styles.textFieldStyle}
                   inputStyle={styles.inputStyle}
                   floatingLabelStyle={styles.floatingLabelStyle}
                   errorStyle={styles.errorStyle}
                   underlineStyle={styles.underlineStyle}
                   onClick={this.inputHandler.bind(this)}
                   floatingLabelText='Password'
        />
        <TextField id='register-input-repassword'
                   name='passwordConfirm'
                   className={classes.input}
                   type='password'
                   autoComplete='off'
                   style={styles.textFieldStyle}
                   inputStyle={styles.inputStyle}
                   floatingLabelStyle={styles.floatingLabelStyle}
                   errorStyle={styles.errorStyle}
                   underlineStyle={styles.underlineStyle}
                   onClick={this.inputHandler.bind(this)}
                   floatingLabelText='Retype Password'
                   errorText={error.PASSWORD_CONFIRM_INPUT? error.PASSWORD_CONFIRM_INPUT : ''}
        />
        <div className={classes.submitButtonRow}>
          <FlatButton label='Submit'
                      style={styles.submitButton}
                      labelStyle={styles.labelStyle}
                      disabled={isRequesting}
                      onClick={this.submitHandler.bind(this)}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isRequesting: state.auth.isRequesting,
  statusText: state.auth.statusText,
  user: state.auth.user,
  error: state.auth.error
})

export default connect(mapStateToProps, authActions)(Register)
