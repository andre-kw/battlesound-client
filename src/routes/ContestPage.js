import React from 'react';
import { Link } from 'react-router-dom';
import ContestSubmission from '../components/ContestSubmission';
import SCPlayer from '../components/SCPlayer';
import config from '../config';
import './ContestPage.css';
import { store } from '../store';
import TokenService from '../services/token';

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
        nowPlaying = (submissions.length > 0) ? submissions[0] : {};
        delete contest.subs;

        this.setState({contest, submissions, nowPlaying});
      });
  }

  render() {
    let submissionTable = <p className="alert">No submissions.</p>;

    if(this.state.submissions.length > 0) {
      submissionTable = (
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
            {this.state.submissions.map(s => <ContestSubmission key={s.id} submission={s} />)}
          </tbody>
        </table>
      );
    }

    return <>
      <h1>{this.state.contest.title}</h1>

      <section className="contest-nowplaying">
        <div className="breadcrumb">
          <Link to="/home">Home</Link>
          <span>Contest</span>
        </div>

        <h3>Now playing</h3>

        {(this.state.nowPlaying !== null)
          ? <SCPlayer trackId={this.state.nowPlaying.id} />
          : <div className="player-placeholder"><p>Nothing to play.</p></div>}
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