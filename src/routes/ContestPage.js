import React from 'react';
import { Link } from 'react-router-dom';
import ContestSubmission from '../components/ContestSubmission';
import SCPlayer from '../components/SCPlayer';
import {Loader} from '../components/Utils';
import TokenService from '../services/token';
import AppContext from '../components/AppContext';
import config from '../config';
import './ContestPage.css';

export default class ContestPage extends React.Component {
  static contextType = AppContext;

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
      nowPlaying: null,
      loading: true,
    };
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id) || 0;

    fetch(`${config.API_ENDPOINT}/contests/${id}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json())
      .then(contest => {
        this.context.setSubmissions(contest.subs);

        if(contest.subs[0])
          this.context.setSelectedSub(contest.subs[0].id);

        delete contest.subs;

        this.setState({contest, loading: false});
      });
  }

  checkIfPlaying = (id) => {
    if(this.context.submissions.length > 0 && this.context.selectedSubIndex > -1) {
      return id === this.context.submissions[this.context.selectedSubIndex].id;
    } else {
      return false;
    }
  }

  render() {
    let nowPlayingSection, jsx;

    let submissionsSection = (
      <section className="contest-submissions">
        <h3>Submissions</h3>

        <table className="submissions-list">
          <thead>
            <tr>
              <th></th>
              <th>Track</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {this.context.submissions.map(s => <ContestSubmission key={s.id} submission={s} isPlaying={this.checkIfPlaying(s.id || 0)} />)}
          </tbody>
        </table>
      </section>
    );

    if(! this.state.loading) {
      // when there's no submissions
      if(this.context.submissions.length === 0) {
        submissionsSection = '';
        nowPlayingSection = (
          <section className="contest-nowplaying">
            <div className="player-placeholder"><p>This contest is active but nobody has submitted anything yet.</p></div>
          </section>
        );
      } else {
        // when there are submissions
        if(this.context.selectedSubIndex > -1) {
          nowPlayingSection = (
            <section className="contest-nowplaying">
              <h3>Now playing</h3>
              <SCPlayer trackId={this.context.submissions[this.context.selectedSubIndex].id} />
              <div className="track-controls">
                <button className="btn-vote"><i className="fas fa-star"></i> <span>Vote for this track</span></button>
              </div>
            </section>
          );
        } else {
          // nowPlayingSection = <div className="player-placeholder"><p>Please select a track.</p></div>;
        }
      }
    }

    jsx = <>
      <section className="contest-header">
        <h1><p>⚔️</p>{this.state.contest.title}</h1>
        <Link to={`/contest/${this.state.contest.id}/submission`} className="btn-contest-submit">Enter your submission</Link>
        <p>12 slots remaining</p>
      </section>
      
      <div className="page-container">
        <div className="breadcrumb">
          <Link to="/home">Home</Link>
          <span>Contest</span>
          <span className="breadcrumb-status">Status: <em>ongoing</em></span>
        </div>

        {nowPlayingSection}

        {submissionsSection}
      </div>
    </>;

    return this.state.loading ? <Loader /> : jsx;
  }
}