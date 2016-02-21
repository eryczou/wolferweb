import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { TextField, FlatButton } from 'material-ui'
import zxcvbn from 'zxcvbn'
import PasswordMeter from '../../components/PasswordMeter/PasswordMeter'

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
    this.state = {
      passwordStrength: 0
    }
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

  onInputClickHandler(e) {
    const { error, removeError } = this.props

    e.stopPropagation()
    switch (e.target.name) {
      case 'email':
        if (error.EMAIL_INPUT) {
          removeError(Constants.EMAIL_INPUT)
        }
        break
      case 'password':
      case 'passwordConfirm':
        if (error.PASSWORD_CONFIRM_INPUT) {
          removeError(Constants.PASSWORD_CONFIRM_INPUT)
        }
        break
    }
  }

  onPasswordEnterHandler(e) {
    e.preventDefault()
    e.stopPropagation()
    const password = e.target.value
    const strength = zxcvbn(password).score
    this.setState({ passwordStrength : strength })
  }

  render() {

    const { isRequesting, statusText, error } = this.props
    const { passwordStrength } = this.state

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
                   onClick={this.onInputClickHandler.bind(this)}
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
                   floatingLabelText='Password'
                   onClick={this.onInputClickHandler.bind(this)}
                   onInput={this.onPasswordEnterHandler.bind(this)}
        />
        <div className={ classes.strengthBarWrapper }>
          <PasswordMeter appendClass={ classes.strengthBar } passwordStrength={ passwordStrength } />
        </div>
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
                   floatingLabelText='Retype Password'
                   errorText={error.PASSWORD_CONFIRM_INPUT? error.PASSWORD_CONFIRM_INPUT : ''}
                   onClick={this.onInputClickHandler.bind(this)}
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
