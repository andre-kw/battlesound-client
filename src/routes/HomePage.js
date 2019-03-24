import React from 'react';
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
          <h2>Ongoing contests</h2>
          <div className="contests">
            {this.state.contests.map(c => <ContestLink key={c.id} contest={c} />)}
          </div>
        </section>
      </div>
    );

    return this.context.loading ? <Loader /> : jsx;
  }
}