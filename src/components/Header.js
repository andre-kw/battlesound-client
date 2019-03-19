import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <div className="nav-left">
            <Link to="/">Battlesound</Link>
          </div>
          <div className="nav-right">
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </header>
    );
  }
}