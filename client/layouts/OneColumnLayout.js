import React, { PropTypes } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../containers/Sidebar';

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
// OneColumnLayout is a pure function of it's props, so we can
// define it with a plain javascript function...
function OneColumnLayout ({ children }) {
  return (
    <div className='wfx-layout-container'>
      <Navbar />
      <Sidebar />
      <div className='container wfx-view-container'>
        <div className='row'>
          <div className='col-md-10 col-md-offset-1'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

OneColumnLayout.propTypes = {
  children: PropTypes.element
};

export default OneColumnLayout;
