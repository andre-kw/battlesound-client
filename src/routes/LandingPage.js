import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default class LandingPage extends React.Component {
  render() {
    return <>
      <section className="landing">
        {/* <div id="s-bg"></div> */}
        
        <h1>Welcome to Battlesound</h1>
        <p>The internet's no-fly zone for beats.</p>

        <Link to="/home" className="btn btn-landing">Enter the battle field</Link>
        <small><Link to="/login">Login</Link> or <Link to="/register">create an account</Link></small>
      </section>

      <section className="landing-about">
        <h2>Getting started</h2>

        <p>
          Whether or not you plan on participate in contests or just voting in them,
          you can start by creating an account. Any user is able to create a contest 
          (which will require the approval of the moderator). Once a contest is created, 
          musicians will be able to send in their submissions and have users vote on 
          the one they like they most. So go ahead and <a href="/register">get started!</a>
        </p>
      </section>
    </>;
  }
}