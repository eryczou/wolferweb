import React, { Component, PropTypes } from 'react';

class Counter extends Component {

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
        <button onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
        <button onClick={incrementIfOdd}>Increment if odd</button>
        {' '}
        <button onClick={() => incrementAsync()}>Increment async</button>
        {' '}
        <button onClick={incrementFromServer}>Increment (Server)</button>
      </p>
    );
  }
}

export default Counter
