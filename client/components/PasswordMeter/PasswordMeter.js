import React, { PropTypes } from 'react'
import ReactDom from 'react-dom'
import { ProgressBar } from 'react-bootstrap'
import classes from './PasswordMeter.scss'



export default class PasswordMeter extends React.Component {

  static propTypes = {
    passwordStrength: PropTypes.number.isRequired
  }

  render()
  {
    const { passwordStrength, appendClass } = this.props

    const pregressBarClasses = [
      { label: <span>Very weak</span>, className: appendClass, bsStyle: 'danger', striped: true, active: true, now: 20 },
      { label: <span>Weak</span>,  className: appendClass, bsStyle: 'danger', striped: true, active: true, now: 40 },
      { label: <span>Ok</span>, className: appendClass, bsStyle: 'warning', striped: true, active: true, now: 60 },
      { label: <span>Strong</span>, className: appendClass, bsStyle: 'success', now: 80 },
      { label: <span>Very strong</span>, className: appendClass, bsStyle: 'success', now: 100 }
    ]

    const barClass = pregressBarClasses[passwordStrength ? passwordStrength : 0]

    return(
      <section>
        <ProgressBar { ...barClass } />
      </section>
    )
  }
}

