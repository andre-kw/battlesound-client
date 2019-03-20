import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token';
import './Header.css';

export default class Header extends React.Component {
  handleLogout =() => {
    TokenService.clearAuthToken();
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
            <Link to="/">Battlesound</Link>
          </div>
          <div className="nav-right">
            {TokenService.hasAuthToken()
              ? this.renderAuthenticated()
              : this.renderUnauthenticated()}
          </div>
        </nav>
      </header>
    );
  }
}