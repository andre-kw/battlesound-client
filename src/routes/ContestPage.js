import React from 'react';
import { Link } from 'react-router-dom';
import ContestSubmission from '../components/ContestSubmission';
import SCPlayer from '../components/SCPlayer';
import {Loader} from '../components/Utils';
import TokenService from '../services/token';
import config from '../config';
import './ContestPage.css';

export default class ContestPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contest: {
        id: 0,
        title: '',
        href: '',
        total_votes: 0,
        total_submissions: 0
      },
      submissions: [],
      nowPlaying: null,
      loading: true,
    };
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id) || 0;
    let submissions = [];
    let nowPlaying = {};

    fetch(`${config.API_ENDPOINT}/contests/${id}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json())
      .then(contest => {
        submissions = contest.subs;
        nowPlaying = (submissions.length > 0) ? submissions[0] : null;
        delete contest.subs;

        this.setState({contest, submissions, nowPlaying, loading: false});
      });
  }

  render() {
    let nowPlayingSection;

    let submissionTable = (
      <table className="submissions-list">
        <thead>
          <tr>
            <th></th>
            <th>Track</th>
            <th>Artist</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {this.state.loading
            ? <Loader />
            : this.state.submissions.map(s => <ContestSubmission key={s.id} submission={s} />)}
        </tbody>
      </table>
    );

    if(! this.state.loading && this.state.submissions.length === 0) {
      submissionTable = <p className="alert">No submissions.</p>;
    }

    if(! this.state.loading) {
      if(this.state.nowPlaying !== null) {
        nowPlayingSection = <SCPlayer trackId={this.state.nowPlaying.id} />;
      } else {
        nowPlayingSection = <div className="player-placeholder"><p>Nothing to play.</p></div>;
      }
    } else {
      nowPlayingSection = <Loader />;
    }

    return <>
      <h1>{this.state.contest.title}</h1>

      <div className="breadcrumb">
        <Link to="/home">Home</Link>
        <span>Contest</span>
      </div>

      <section className="contest-nowplaying">
        <h3>Now playing</h3>

        {nowPlayingSection}
      </section>


      <section className="contest-submit">
        <Link to={`/contest/${this.state.contest.id}/submission`} className="btn-contest-submit">Enter your submission</Link>
      </section>

      <section className="contest-submissions">
        <h3>Submissions</h3>

        {submissionTable}
      </section>
    </>;
  }
}