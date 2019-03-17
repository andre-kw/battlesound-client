import React from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import './HomePage.css';
import ContestLink from '../../components/ContestLink/ContestLink';

export default class HomePage extends React.Component {
  
  render() {
    return (
      <section className="home">
        <h2>Ongoing contests</h2>
        <div className="contests">
          {store.contests.map(c => <ContestLink item={c} />)}
        </div>
      </section>
    );
  }
}