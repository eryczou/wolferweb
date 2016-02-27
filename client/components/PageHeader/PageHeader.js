import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classes from './PageHeader.scss'

function ViewHeader ({ title, subTitle }) {
  return (
    <div className={ classes.header }>
      <div className={ classes.contentWrapper }>
        <div className={ classes.brand } >
          <Link to='/' >
            <img className={classes.logo} src={require('../../static/img/wolferx/wolferx_logo_hd.png')} />
          </Link>
        </div>
        <h1 className={ classes.title }>
          { title }
        </h1>
        <div className={ classes.subTitle }>
          { subTitle }
        </div>
      </div>
    </div>
  )
}

ViewHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
}

export default ViewHeader
