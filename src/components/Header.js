import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token';
import './Header.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  handleLogin =() => {
    this.setState({loggedIn: true});
  }

  handleLogout =() => {
    TokenService.clearAuthToken();
    this.setState({loggedIn: false});
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
      <Link to="/login" onClick={this.handleLogin}>Login</Link>
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
            {this.state.loggedIn
              ? this.renderAuthenticated()
              : this.renderUnauthenticated()}
          </div>
        </nav>
      </header>
    );
  }
}