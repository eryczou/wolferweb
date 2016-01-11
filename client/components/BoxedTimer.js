import React from 'react';

class BoxedTimer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="wfx-boxedTimer" className="wfx-effect-boxShadow">
        <div className="wfx-boxedTimer-innerBox wfx-textAlign-center">
          <h4>6:30am ~ 1:00am, 7 Days a Week</h4>
          <h5><span className="glyphicon glyphicon-phone-alt"></span>&nbsp;(985)649-5400</h5>
          <p className="bg-warning wfx-padding-10 wfx-round-corner">If you arrive later than 1:00am, please call: (985)6495400-105,
            or go to room 105 for assistant.</p>
        </div>
      </div>
    );
  }
}

export default BoxedTimer;