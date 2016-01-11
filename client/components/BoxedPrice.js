import React from 'react';

class BoxedFeature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let extraBedIcon = (this.props.id%2 == 0) ? (
      <span className="glyphicon glyphicon-bed wfx-padding-5"></span>
    ) : null;

    return (
      <div id="wfx-boxedPrice">
        <h4>
          <span className="glyphicon glyphicon-bed wfx-padding-5"></span>
          {extraBedIcon}
        </h4>
        <h4>{this.props.plan}</h4>
        <h5>Rate: {this.props.rate}</h5>
        <h5>Tax: {this.props.tax}</h5>
        <h5>City Room Fee: {this.props.CRF}</h5>
        <h4>Total: {this.props.total}</h4>
        <h5 className="wfx-text-italic">({this.props.addon})</h5>
      </div>
    );
  }
}

export default BoxedFeature;