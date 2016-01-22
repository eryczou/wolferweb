import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { actions as counterActions } from '../../redux/modules/counter'

class Counter extends React.Component {

  static propTypes = {
    increment: PropTypes.func.isRequired,
    incrementFromServer: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
  };

  render() {
    const { increment, incrementFromServer, incrementIfOdd, incrementAsync, decrement, counter } = this.props;

    return (
      <p>
        Clicked: {counter} times
        {' '}
        <button onClick={ () => increment(1) }>+</button>
        {' '}
        <button onClick={ () => decrement(2) }>-</button>
        {' '}
        <button onClick={ incrementIfOdd }>Increment if odd</button>
        {' '}
        <button onClick={ () => incrementAsync() }>Increment async</button>
        {' '}
        <button onClick={ incrementFromServer }>Increment (Server)</button>
      </p>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

export default connect(mapStateToProps, counterActions)(Counter)
