import React from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import './HomePage.css';
import ContestLink from '../../components/ContestLink/ContestLink';
import ContestsService from '../../services/contests';

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