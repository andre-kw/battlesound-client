import React from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import './HomePage.css';

export default class HomePage extends React.Component {
  
  render() {
    return (
      <section className="home">
        <h2>Ongoing contests</h2>
        <div className="contests">
          {store.contests.map(c => 
            <Link to={'/contest/' + c.id} className="contest-ongoing">
              <h3>{c.title}</h3>

              <div className="stats">
                <span className="stats-votes">34</span>
              </div>
            </Link>
          )}
        </div>
      </section>
    );
  }
}