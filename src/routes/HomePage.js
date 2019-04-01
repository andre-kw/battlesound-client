import React from 'react';
import { Link } from 'react-router-dom';
import ContestsService from '../services/contests';
import AppContext from '../components/AppContext';
import ContestLink from '../components/ContestLink';
import { Loader } from '../components/Utils';
import './HomePage.css';

export default class HomePage extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    ContestsService.getContests(this.context.user.id)
      .then(contests => {
        this.context.setLoading(false);
        this.context.setContests(contests);
      });
  }

  render() {
    let jsx = (
      <div className="page-container">
        <section className="home-contest-list">
          <div className="header-w-link">
            <h2>Battlegrounds</h2>
            <Link to="/contest/create" className="btn btn-create"><i className="fas fa-plus-square"></i>Create contest</Link>
          </div>

          <div className="contests">
            {this.context.contests.length === 0 && !this.context.loading 
              ? <p className="alert">There are no active contests. Why not create one?</p> 
              : this.context.contests.map(c => <ContestLink key={c.id} contest={c} />)}
          </div>
        </section>
      </div>
    );

    return this.context.loading ? <Loader /> : jsx;
  }
}