import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { TextField } from 'material-ui'

import classes from './Register.scss'
import { actions as authActions } from '../../redux/modules/auth'

class Register extends React.Component {

  static propTypes = {
    isRequesting: PropTypes.bool.isRequired,
    statusText: PropTypes.string.isRequired,
    registerUser: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
  }

  submitHandler(e) {
    e.preventDefault()
    e.stopPropagation()
    const email = $('#register-input-email').val()
    const password = $('#register-input-password').val()
    this.props.registerUser(email, password)
  }

  inputHandler(e) {
    e.stopPropagation()
  }

  render() {

    const { isRequesting, statusText } = this.props

    return (
      <div className={ classes.registerContainer }>
        {statusText ? <p className={classes.statusText}>{ statusText }</p> : ''}
        <TextField id='register-input-email'
                   className={ classes.input }
                   type='text'
                   autoComplete='off'
                   onClick={ this.inputHandler.bind(this) }
                   floatingLabelText='Email'
                   floatingLabelStyle={{ color: '#777777' }}
                   inputStyle={{ color: 'white' }}/>
        <TextField id='register-input-password'
                   className={ classes.input }
                   type='password'
                   autoComplete='off'
                   onClick={ this.inputHandler.bind(this) }
                   floatingLabelText='Password'
                   floatingLabelStyle={{ color: '#777777' }}
                   inputStyle={{ color: 'white' }}/>
        <button type='submit'
                className='btn btn-lg'
                disabled={ isRequesting }
                onClick={ this.submitHandler.bind(this) }>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isRequesting : state.auth.isRequesting,
  statusText : state.auth.statusText,
  user : state.auth.user
})

export default connect(mapStateToProps, authActions)(Register)
