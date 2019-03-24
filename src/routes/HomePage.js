import React from 'react';
import { Link } from 'react-router-dom';
import ContestsService from '../services/contests';
import ContestLink from '../components/ContestLink';
import './HomePage.css';
import AppContext from '../components/AppContext';
import { Loader } from '../components/Utils';

export default class HomePage extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      contests: []
    };
  }

  componentDidMount() {
    ContestsService.getContests()
      .then(json => {
        this.context.setLoading(false);
        this.setState({contests: json})
      })
  }

  render() {
    let jsx = (
      <div className="page-container">
        <section className="home">
          <div className="header-w-link">
            <h2>Ongoing contests</h2>
            <Link to="/contest/create" className="btn btn-create"><i className="fas fa-plus-square"></i>Create contest</Link>
          </div>

          <div className="contests">
            {this.state.contests.length === 0 ? <p className="alert">There are no active contests. Why not create one?</p> : ''}
            {this.state.contests.map(c => <ContestLink key={c.id} contest={c} />)}
          </div>
        </section>
      </div>
    );

    return this.context.loading ? <Loader /> : jsx;
  }
}