import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';
import ContestCard from '../components/ContestCard';
import { Loader } from '../components/Utils';
import './HomePage.css';

export default class HomePage extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    this.context.getContests();
  }

  render() {
    let jsx = (
      <div className="page-container">
        <section className="contest-list">
          <header className="header-home">
            <h2>Battlegrounds</h2>
            <Link to="/contest/create" className="btn btn-create"><i className="fas fa-plus-square"></i>Create contest</Link>
          </header>

          <div className="contest-cards">
            {this.context.contests.length === 0 && !this.context.loading 
              ? <p className="alert">There are no active contests. Why not create one?</p> 
              : this.context.contests.map(c => <ContestCard key={c.id} contest={c} />)}
          </div>
        </section>
      </div>
    );

    return this.context.loading ? <Loader /> : jsx;
  }
}