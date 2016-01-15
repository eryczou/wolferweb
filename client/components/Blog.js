import React from 'react';

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='wfx-blog'>
        <div className='$color-text-primary'>
          <h1 className='wfx-blog-mainTitle'>WolferX</h1>
          <p className='wfx-blog-content'>
            WolferX is <strong>end-to-end</strong> web application solution.<br/>
          </p>
          <h3 className='wfx-blog-subTitle'>
            Architecture
          </h3>
          <p className='wfx-blog-content'>
            Nginx, Reactjs, Nodejs, Tomcat, Jersey, Cassandra, and MongoDB.
          </p>
          <h3 className='wfx-blog-subTitle'>
            Philosophy
          </h3>
          <p className='wfx-blog-content'>
            Deploy the <strong>best practice</strong> of engineering to every issues that will be encountered during web app implementation.
          </p>
          <h3 className='wfx-blog-subTitle'>
            Atmosphere
          </h3>
          <p className='wfx-blog-content'>
            Here is for meet up! for group up! for talk and learn, for <strong>not being alone when engineering something up</strong>.
          </p>
          <h3 className='wfx-blog-subTitle'>
            Goal
          </h3>
          <p className='wfx-blog-content'>
            To build a solid web application end-to-end solution, that helps any beautiful idea become a <strong>tangible product</strong> easier, faster, and more reliable.
          </p>
        </div>
      </div>
    );
  }
}

export default Blog;
