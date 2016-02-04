import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classes from './Navbar.scss'

class Navbar extends React.Component {

  static propTypes = {
    paddingRight: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props)
  }

  render() {

    const { paddingRight } = this.props

    const navbarClass = 'navbar navbar-default navbar-static-top '
      + 'col-xs-11 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 '
      + classes.navbar

    return (
      <div className={'container ' + classes.wrapper}
           style={{ paddingRight }}>
        <div className='row'>
          <nav className={ navbarClass }
               role='navigation'>
            <div className='navbar-header'>
              <button type='button'
                      className={'navbar-toggle collapsed ' + classes.button}
                      data-toggle='collapse'
                      data-target='#navbar'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
              <Link to='/' className={'navbar-brand ' + classes.brand} >
                <img className={classes.logo} src={require('../../static/img/wolferx/wolferx_logo_hd.png')} />
              </Link>
            </div>
            <div id='navbar' className='navbar-collapse collapse'>
              <ul className='nav navbar-nav'>
                <li><Link to='/' className={classes.link} >Home</Link></li>
                <li><Link to='/counter' className={classes.link} >Counter</Link></li>
                <li><Link to='/docchef' className={classes.link} >DocChef</Link></li>
                <li><Link to='/protected' className={classes.link} >protected</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default Navbar
