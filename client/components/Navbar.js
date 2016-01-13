import React from 'react';
import {Link} from 'react-router';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      // bootstrap navbar
      <div className='container wfx-navbar-wrapper wfx-navbar-fixed'>
        <div className='row'>
          <nav className='navbar navbar-default navbar-static-top wfx-navbar col-xs-11 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1' role='navigation'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed wfx-navbar-button' data-toggle='collapse' data-target='#navbar'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
              <Link to='/' className='navbar-brand wfx-navbar-brand'>
                <img className='wfx-navbar-logo' src={require('../static/img/wolferx/wolferx_logo_hd.png')} />
              </Link>
            </div>
            <div id='navbar' className='navbar-collapse collapse'>
              <ul className='nav navbar-nav'>
                <li><Link to='/' className='wfx-navbar-link' >Home</Link></li>
                <li><Link to='/price' className='wfx-navbar-link'>Price</Link></li>
                <li><Link to='/contact' className='wfx-navbar-link' >What</Link></li>
              </ul>
              <ul className='nav navbar-nav navbar-right'>
                <li className='dropdown'>
                  <Link to='#' className='dropdown-toggle wfx-navbar-link' data-toggle='dropdown'>
                    Menu
                    <span className='caret wfx-margin-left-5'></span>
                  </Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/blog-editor'>Blog Editor</Link></li>
                    <li><Link to='/top'>Add Friends</Link></li>
                    <li className='divider'></li>
                    <li><Link to='#'>Login</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;
