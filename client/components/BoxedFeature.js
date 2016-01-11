import React from 'react';

class BoxedFeature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="wfx-boxedFeature" className={this.props.className}>
        <div className="wfx-boxedFeature-innerBox">
          <h4>AMENITIES</h4>
          <p className="wfx-boxedFeature-amenities">
            <span className="glyphicon glyphicon-cutlery" aria-hidden="true"></span> - Free Breakfast &nbsp;&nbsp;
            <span className="glyphicon glyphicon-signal" aria-hidden="true"></span> - Free Wifi &nbsp;&nbsp;
            <span className="glyphicon glyphicon-tint" aria-hidden="true"></span> - Laundry &nbsp;
          </p>
          <p className="wfx-boxedFeature-amenities">
            <span className="glyphicon glyphicon-flag" aria-hidden="true"></span> - Free Parking &nbsp;&nbsp;
            <span className="glyphicon glyphicon-modal-window" aria-hidden="true"></span> - Microwave, Fridge, and TV &nbsp;&nbsp;
          </p>
          <p className="wfx-boxedFeature-amenities">
            <span className="glyphicon glyphicon-print" aria-hidden="true"></span> - Fax and Printer &nbsp;&nbsp;
            <span className="glyphicon glyphicon-road" aria-hidden="true"></span> - 25mins to New Orleans &nbsp;&nbsp;
          </p>
        </div>
      </div>
    );
  }
}

export default BoxedFeature;