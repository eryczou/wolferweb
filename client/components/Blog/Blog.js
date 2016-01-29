import React from 'react'
import classes from './Blog.scss'

class Blog extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='wfx-blog'>
        <div className='$color-text-primary'>
          <h1 className={classes.mainTitle}>WolferX</h1>
          <p className={classes.content}>
            WolferX is <strong>end-to-end</strong> web application solution.<br/>
          </p>
          <h3 className={classes.subTitle}>
            Architecture
          </h3>
          <p className={classes.content}>
            Nginx, Reactjs, Nodejs, Tomcat, Jersey, Cassandra, and MongoDB.
          </p>
          <h3 className={classes.subTitle}>
            Philosophy
          </h3>
          <p className={classes.content}>
            Deploy the <strong>best practice</strong> of engineering to every issues that will be encountered during web app implementation.
          </p>
          <h3 className={classes.subTitle}>
            Atmosphere
          </h3>
          <p className={classes.content}>
            Here is for meet up! for group up! for talk and learn, for <strong>not being alone when engineering something up</strong>.
          </p>
          <h3 className={classes.subTitle}>
            Goal
          </h3>
          <p className={classes.content}>
            To build a solid web application end-to-end solution, that helps any beautiful idea become a <strong>tangible product</strong> easier, faster, and more reliable.
          </p>
        </div>
      </div>
    );
  }
}

export default Blog
