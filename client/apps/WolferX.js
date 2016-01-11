import React from 'react';
import { connect } from 'react-redux';
import OneColumnLayout from '../layouts/OneColumnLayout';

class WolferX extends React.Component {

  static propTypes = {
    children: React.PropTypes.element
  };

  render() {
    return (
      <div className="wfx-app-container wfx-theme-sciFiDark">
        {this.props.children}
      </div>
    );
  }
}

export default WolferX;
