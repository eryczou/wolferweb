import React from 'react';

class BoxedInformation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="wfx-boxedFeature" className={this.props.className}>
        <div className="wfx-boxedFeature-innerBox">
          <h4>There're more...</h4>
          <p className="wfx-boxedFeature-amenities">
            We are <strong>Close To New Orleans</strong> and next door to the Wal-Mart.
            Many free utilities for your convenience: <strong>free wifi</strong>
            , <strong>free parking</strong>, <strong>free fax</strong>, and <strong>free breakfast</strong>.
          </p>
          <h4 className="wfx-boxedFeature-amenities">
            Guest Room
          </h4>
          <p className="wfx-boxedFeature-amenities">
            Well-decorated and spacious guest rooms for your comfort after a long driving.
            The amenities include: <strong>Television</strong>, <strong>Microwave</strong>, <strong>Refrigerator</strong>, <strong>24-hours hot shower</strong>.
          </p>
          <h4 className="wfx-boxedFeature-amenities">
            DINING OPTIONS
          </h4>
          <p className="wfx-boxedFeature-amenities">
            A new restaurant plaza recently opened very close to our location.
            Hooters, Waffle House, Outback Steakhouse and many other choices are waiting for you.
          </p>
        </div>
      </div>
    );
  }
}

export default BoxedInformation;