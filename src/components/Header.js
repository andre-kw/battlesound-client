import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token';
import AppContext from './AppContext';
import './Header.css';

export default class Header extends React.Component {
  static contextType = AppContext;

  handleLogout =() => {
    TokenService.clearAuthToken();
    this.context.setUserLoggedIn(false);
  }

  renderAuthenticated() {
    return (
      <>
        <Link to="/" onClick={this.handleLogout}>Logout</Link>
      </>
    );
  }

  renderUnauthenticated() {
    return (
      <Link to="/login">Login</Link>
    );
  }

  render() {
    return (
      <header>
        <nav>
          <div className="nav-left">
          <Link to={TokenService.hasAuthToken() ? '/home' : '/'}>
              <img src="/img/crosshair.svg" className="logo" alt="logo"></img>
              <p>Battlesound</p>
            </Link>
          </div>

          <div className="nav-center">
            
          </div>

          <div className="nav-right">
            {this.context.isLoggedIn
              ? this.renderAuthenticated()
              : this.renderUnauthenticated()}
          </div>
        </nav>
      </header>
    );
  }
}