import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default class LandingPage extends React.Component {
  render() {
    return (
      <section className="landing">
        {/* <div id="s-bg"></div> */}
        
        <h1>Welcome to Battlesound</h1>
        <p>The internet's no-fly zone for beats.</p>

        <Link to="/home" className="btn btn-landing">Enter the battle field</Link>
        <small><Link to="/login">Login</Link> or <Link to="/register">create an account</Link></small>
      </section>
    );
  }
}