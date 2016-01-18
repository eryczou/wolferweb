import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import classes from './navbar.scss'

class Navbar extends React.Component {

  static propTypes = {
    paddingRight: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {

    var {paddingRight} = this.props;

    return (
      <div className={'container ' + classes.wrapper}
           style={{ paddingRight }}>
        <div className='row'>
          <nav className={'navbar navbar-default navbar-static-top col-xs-11 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 ' + classes.navbar}
               role='navigation'>
            <div className='navbar-header'>
              <button type='button' className={'navbar-toggle collapsed ' + classes.button} data-toggle='collapse' data-target='#navbar'>
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
                <li><Link to='/price' className={classes.link} >Price</Link></li>
                <li><Link to='/contact' className={classes.link} >What</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;
