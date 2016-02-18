import React from 'react'
import classes from './Blog.scss'

class Blog extends React.Component {
  render() {
    return (
      <div id='wfx-blog'>
        <div className='$color-text-primary'>
          <h1 className={classes.mainTitle}>WolferX</h1>
          <p className={classes.content}>
            {`WolferX is end-to-end web application solution.`}
          </p>
          <h3 className={classes.subTitle}>
            Architecture
          </h3>
          <p className={classes.content}>
            {`Nginx, Reactjs, Nodejs, MySQL`}
          </p>
          <h3 className={classes.subTitle}>
            Philosophy
          </h3>
          <p className={classes.content}>
            {`Deploy the best practice of engineering to issues
            that encountered during implementation.`}
          </p>
          <h3 className={classes.subTitle}>
            Atmosphere
          </h3>
          <p className={classes.content}>
            {`Here is for meet up! group up! talk and learn!
            for not being alone when gear something up.`}
          </p>
          <h3 className={classes.subTitle}>
            Goal
          </h3>
          <p className={classes.content}>
            {`To build a solid web application end-to-end solution, that
            helps any great idea become a tangible product easier,
            faster, and reliable.`}
          </p>
        </div>
      </div>
    )
  }
}

export default Blog
