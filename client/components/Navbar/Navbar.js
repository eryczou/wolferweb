import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classes from './Navbar.scss'

class Navbar extends React.Component {

  render() {

    return (
      <div className={'container ' + classes.wrapper} >
        <nav className={ `navbar + ${classes.navbar}` } role='navigation'>
          <div id='navbar' className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
              <li><Link to='/' className={classes.link} >Home</Link></li>
              <li><Link to='/blog' className={classes.link} >Blog</Link></li>
              <li><Link to='/counter' className={classes.link} >Counter</Link></li>
              <li><Link to='/docchef' className={classes.link} >DocChef</Link></li>
              <li><Link to='/protected' className={classes.link} >Protected</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
