import React from 'react';
import { Link } from 'react-router-dom';
import ContestSubmitPage from './ContestSubmitPage';
import AppContext from '../components/AppContext';
import ContestSubmission from '../components/ContestSubmission';
import SCPlayer from '../components/SCPlayer';
import {Loader, Breadcrumb} from '../components/Utils';
import TokenService from '../services/token';
import config from '../config';
import './ContestPage.css';

export default class ContestPage extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    this.grabData();
  }

  componentWillUnmount() {
    this.context.setContest({});
    this.context.setSelectedSub(0);
  }

  grabData = () => {
    this.context.setLoading(true);
    const id = parseInt(this.props.match.params.id) || 0;

    fetch(`${config.API_ENDPOINT}/contests/${id}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json())
      .then(contest => {
        this.context.setContest(contest);
        this.context.setLoading(false);

        if(contest.subs) {
          this.context.setSelectedSub(0);
        }
      });
  }

  voteForSub = () => {
    let listenedToAll = true;

    this.context.submissions.forEach(s => {
      if(! s.listened) {
        listenedToAll = false;
      }
    });

    if(listenedToAll) {
      fetch(`${config.API_ENDPOINT}/votes/${this.context.contest.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify({
          user_id: this.context.user.id,
          contest_id: this.context.contest.id
        })
      })
        .then(res => res.json())
        .then(json => {
          if(json.error) {
            this.context.setError(json.error);
          }
          console.log(json);
        });
    } else {
      this.context.setError('You need to listen to all submissions before you can vote.');
    }
  }

  redirect = () => {
    this.props.history.push(this.props.location.pathname);
  }

  render() {
    /* FOR THE FUTURE
      if(this.state.contest.completed) {
        return <ContestCompletedPage />
      }
    */

    if(this.context.loading) {
      return <Loader />;
    }

    if(this.props.location.hash === '#submit') {
      if(TokenService.hasAuthToken()) {
        return <ContestSubmitPage contestId={this.props.match.params.id} redirect={this.redirect} grabData={this.grabData} />;
      } else {
        this.props.history.push('/login');
      }
    }

    let nowPlayingSection, jsx, status;
    let error = this.context.error ? <div className="alert alert-danger">{this.context.error}</div> : '';

    switch(this.context.contest.status) {
      case 0: status = <em className="text-fail">cancelled</em>; break;
      case 1: status = <em className="text-success">ongoing</em>; break;
      case 2: status = <em className="text-warning">ended</em>; break;
      default: status = ''; break;
    }

    let submissionsSection = <>
      <h3>Submissions</h3>

      <section className="contest-submissions">
        <table className="submissions-list">
          <thead>
            <tr>
              <th></th>
              <th>Track</th>
              <th>Artist</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.context.submissions.map((s, index) => <ContestSubmission key={`${s.id} - ${index}`} index={index} submission={s} />)}
          </tbody>
        </table>
      </section>
    </>;

    if(! this.context.loading) {
      // when there's no submissions
      if(this.context.submissions.length === 0) {
        submissionsSection = '';
        nowPlayingSection = (
          <section className="contest-nowplaying">
            <div className="player-placeholder"><p>This contest is active but nobody has submitted anything yet.</p></div>
          </section>
        );
      // when there are submissions
      } else if(this.context.submissions.length > this.context.selectedSubIndex - 1) {
        let trackId = this.context.submissions[this.context.selectedSubIndex].sc_track_id;

        nowPlayingSection = <>
          <section className="no-pad">
            <h3 className="now-playing">
              Now playing
              <button className="btn-vote" onClick={this.voteForSub}><i className="fas fa-star"></i> <span>Vote for this track</span></button>
            </h3>
            <SCPlayer trackId={trackId} />
          </section>
        </>;
      } else {
        // nowPlayingSection = <div className="player-placeholder"><p>Please select a track.</p></div>;
      }
    }

    jsx = <>
      <section className="contest-header">
        <h1><p>⚔️</p>{this.context.contest.title}</h1>
        <Link to={`/contest/${this.context.contest.id}#submit`} className="btn-contest-submit">Enter your submission</Link>
        <p>{this.context.contest.max_submissions - this.context.submissions.length} slots remaining</p>
      </section>
      
      {error}

      <div className="page-container">
        <Breadcrumb>
          <span>Contest page</span>
          <span className="breadcrumb-status">Status: {status}</span>
        </Breadcrumb>

        {nowPlayingSection}

        {submissionsSection}
      </div>
    </>;

    return jsx;
  }
}