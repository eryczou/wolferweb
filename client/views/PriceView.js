import React from 'react';
import { connect } from 'react-redux';
import App from '../containers/App';

class PriceView extends React.Component {
  render() {
    return (
      <div id="wfx-price">
        <div className="container wfx-mainWrapper wfx-align-vCenter">
          <App />
        </div>
      </div>
    );
  }
}

export default PriceView;
