import React from 'react';

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='wfx-blog'>
        <div className='$color-text-primary'>
          <h1 className='wfx-blog-mainTitle'>The blog of WolferX</h1>
          <p className='wfx-blog-content'>
            We are <strong>Close To New Orleans</strong> and next door to the Wal-Mart.
            Many free utilities for your convenience: <strong>free wifi</strong>
            , <strong>free parking</strong>, <strong>free fax</strong>, and <strong>free breakfast</strong>.
          </p>
          <h3 className='wfx-blog-subTitle'>
            Guest Room
          </h3>
          <p className='wfx-blog-content'>
            Well-decorated and spacious guest rooms for your comfort after a long driving.
            The amenities include: <strong>Television</strong>, <strong>Microwave</strong>, <strong>Refrigerator</strong>, <strong>24-hours hot shower</strong>.
          </p>
          <h3 className='wfx-blog-subTitle'>
            DINING OPTIONS
          </h3>
          <p className='wfx-blog-content'>
            A new restaurant plaza recently opened very close to our location.
            Hooters, Waffle House, Outback Steakhouse and many other choices are waiting for you.
          </p>
        </div>
      </div>
    );
  }
}

export default Blog;
