import React from 'react';

class BoxedFeature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="wfx-boxedFeature" className={this.props.className}>
        <div className="wfx-boxedFeature-innerBox">
          <h4>
            <span className="glyphicon glyphicon-phone-alt"></span>&nbsp;
            - (985)649-5400
          </h4>
          <h4>
            <span className="glyphicon glyphicon-map-marker"></span>&nbsp;
            - 58506 Yaupon Dr, Slidell, LA 70461</h4>
        </div>
      </div>
    );
  }
}

export default BoxedFeature;