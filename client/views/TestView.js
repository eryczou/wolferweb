import React from 'react'
import { checkHttpStatus, parseJSON } from '../utils/webUtils'
import Register from '../containers/Register/Register'


class CounterView extends React.Component {

  constructor(props) {
    super(props)
  }

  fetchRequest() {
    fetch('http://ec2-54-208-23-64.compute-1.amazonaws.com:9999/api/newjob/999', {
      method: 'post',
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        task: 'start a clustering job'
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        $('#showbox').text(JSON.stringify(response.payload))
      })
      .catch((error) => {
        console.log(error)
        $('#showbox').text(error)
      })
  }

  render() {
    return (
      <div id='wfx-price'>
        <div>
          Test Link to <a href='https://centos55.hightail.com'>centos55.hightail.com</a>
        </div>
        <button onClick={this.fetchRequest.bind(this)}> Get Movies from Server </button>
        <div id='showbox'>
          1234
        </div>
        <Register />
      </div>
    )
  }
}

export default CounterView
