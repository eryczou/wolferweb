import React from 'react';
import {Link} from 'react-router';

class TopBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="wfx-topBanner" className="wfx-align-vCenter">
        <h1 className="wfx-topBanner-title">Value Travel Inn</h1>
        <span className="wfx-topBanner-subTitle">Slidell, LA</span>
      </div>
    );
  }
}

export default TopBanner;