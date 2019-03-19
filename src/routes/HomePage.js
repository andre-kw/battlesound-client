import React from 'react';
import { Link } from 'react-router-dom';
import ContestsService from '../services/contests';
import ContestLink from '../components/ContestLink';
import './HomePage.css';
import { store } from '../store';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contests: []
    };
  }

  componentDidMount() {
    ContestsService.getContests()
      .then(json => {
        this.setState({contests: json})
      })
  }

  render() {
    return (
      <section className="home">
        <h2>Ongoing contests</h2>
        <div className="contests">
          {this.state.contests.map(c => <ContestLink key={c.id} contest={c} />)}
        </div>
      </section>
    );
  }
}