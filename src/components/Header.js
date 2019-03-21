import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token';
import AppContext from './AppContext';
import './Header.css';

export default class Header extends React.Component {
  static contextType = AppContext;

  renderAuthenticated() {
    return <>
      <Link to="/" className="nav-link" onClick={console.log('hq')}><i className="fas fa-chess-king"></i> HQ</Link>
      <Link to="/" className="nav-link nav-logout" onClick={this.context.handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</Link>
    </>;
  }

  renderUnauthenticated() {
    return (
      <Link to="/login" className="nav-link">Login</Link>
    );
  }

  render() {
    return (
      <header>
        <nav>
          <div className="nav-left">
            <Link to={this.context.isUserLoggedIn ? '/home' : '/'}>
              <img src="/img/crosshair.svg" className="logo" alt="logo"></img>
              <p>Battlesound</p>
            </Link>
          </div>

          <div className="nav-center"></div>

          <div className="nav-right">
            {this.context.isUserLoggedIn
              ? this.renderAuthenticated()
              : this.renderUnauthenticated()}
          </div>
        </nav>
      </header>
    );
  }
}