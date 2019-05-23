import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token';
import VotesService from '../services/votes';
import AppContext from '../components/AppContext';
import ContestSubmitPage from './ContestSubmitPage';
import ContestWinnersPage from './ContestWinnersPage';
import ContestSubmission from '../components/ContestSubmission';
import SCPlayer from '../components/SCPlayer';
import {Loader, Breadcrumb, Alert} from '../components/Utils';
import './ContestPage.css';

export default class ContestPage extends Component {
  static contextType = AppContext;

  componentDidMount() {
    let id = parseInt(this.props.match.params.id);
    id = isNaN(id) ? 0 : id;

    this.context.getContestById(id);
  }

  componentWillUnmount() {
    this.context.setContest({});
    this.context.setSelectedSub(0);
  }

  voteForSub = () => {
    this.context.submissions.forEach(s => {
      if(! s.listened) {
        this.context.setError('You need to listen to all submissions before you can vote.');
        return;
      }
    });

    const postBody = {
      user_id: this.context.user.id,
      contest_id: this.context.contest.id,
      submission_id: this.context.submissions[this.context.selectedSubIndex].id
    };

    VotesService.castVote(this.context.contest.id, postBody)
      .then(json => {
        if(json.error) this.context.setError(json.error);

        console.log(json);
      })
      .catch(err => { console.log(err) });
  }

  redirect = () => {
    this.props.history.push(this.props.location.pathname);
  }

  render() {
    let trackId = this.context.submissions.length > 0 ? this.context.submissions[this.context.selectedSubIndex].sc_track_id : 0;

    //let votedJsx = <div className="contest-voted"><p>You have voted in this contest.</p></div>;

    let nowPlayingNoTracksJsx = (
      <section className="contest-now-playing">
        <div className="player-placeholder"><p>This contest is active but nobody has submitted anything yet.<br></br>Why not be the first?</p></div>
      </section>
    );

    let nowPlayingJsx = (
      <section className="contest-now-playing">
        <header class="header-now-playing">
          <h3>Now Playing</h3>
          <button className="btn-vote" onClick={this.voteForSub}><i className="fas fa-star"></i> <span>Vote</span></button>
        </header>

        <SCPlayer trackId={trackId} />
      </section>
    );

    let submissionsJsx = (
      <section className="contest-submissions">
        <header className="header-submissions">
          <h3>Submissions</h3>
        </header>

        <div className="section-content">
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
        </div>
      </section>
    );

    let jsx = <>
      {this.context.contest.user_vote}
      <section className="contest-header">
        <h1><p>⚔️</p>{this.context.contest.title}</h1>
        <Link to={`/contest/${this.context.contest.id}#submit`} className="btn-contest-submit">Enter your submission</Link>
        <p>{this.context.contest.max_submissions - this.context.submissions.length} slots remaining</p>
      </section>
      
      {this.context.error && <Alert type="danger">{this.context.error}</Alert>}

      <div className="page-container">
        <Breadcrumb status={this.context.contest.status}>
          <span>Contest page</span>
        </Breadcrumb>

        { this.context.submissions.length > 0 
          ? nowPlayingJsx
          : nowPlayingNoTracksJsx }

        {this.context.submissions.length > 0 && submissionsJsx}
      </div>
    </>;

    /* FOR THE FUTURE
      if(this.state.contest.completed) {
        return <ContestCompletedPage />
      }
    */

    // submission page
    if(this.props.location.hash === '#submit') {
      if(TokenService.hasAuthToken()) {
        return <ContestSubmitPage contestId={this.props.match.params.id} redirect={this.redirect} grabData={this.grabData} />;
      } else {
        this.props.history.push('/login');
      }
    }

    if(this.context.contest.status === 3) {
      return <ContestWinnersPage status={this.context.contest.status} />;
    }

    return this.context.loading ? <Loader /> : jsx;
  }
}