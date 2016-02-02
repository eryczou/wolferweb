import React from 'react';
import { checkHttpStatus, parseJSON } from '../utils/webUtils'


class CounterView extends React.Component {

  constructor(props) {
    super(props)
  }

  getMovies() {
    fetch('http://localhost:3000/api/test/movies', {
      headers: {
        'Accept': 'application/json'
      }
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
        <button onClick={ this.getMovies.bind(this) }> Get Movies from Server </button>
        <div id='showbox'>
          1234
        </div>
      </div>
    );
  }
}

export default CounterView
