import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token';
import ContestsService from '../services/contests';
import VotesService from '../services/votes';
import AppContext from '../components/AppContext';
import ContestSubmitPage from './ContestSubmitPage';
import ContestWinnersPage from './ContestWinnersPage';
import ContestSubmission from '../components/ContestSubmission';
import SCPlayer from '../components/SCPlayer';
import {Loader, Breadcrumb, Alert} from '../components/Utils';
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

    ContestsService.getContestById(id)
      .then(contest => {
        this.context.setContest(contest);
        this.context.setLoading(false);

        if(contest.subs) this.context.setSelectedSub(0);
      })
      .catch(err => {console.log(err);});
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
    let nowPlayingSection, jsx;
    let error = this.context.error ? <Alert type="danger">{this.context.error}</Alert> : '';
    let votedJsx = <div className="contest-voted"><p>You have voted in this contest.</p></div>
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

    if(this.context.contest.status === 3) {
      return <ContestWinnersPage status={this.context.contest.status} />;
    }

    if(! this.context.loading) {
      // when there's no submissions
      if(this.context.submissions.length === 0) {
        submissionsSection = '';

        nowPlayingSection = (
          <section className="contest-nowplaying">
            <div className="player-placeholder"><p>This contest is active but nobody has submitted anything yet.<br></br>Why not be the first?</p></div>
          </section>
        );
      // when there are submissions
      } else if(this.context.submissions.length > this.context.selectedSubIndex - 1) {
        let trackId = this.context.submissions[this.context.selectedSubIndex].sc_track_id;

        nowPlayingSection = <>
          <section className="no-pad">
            <h3 className="now-playing">
              Now playing
              <button className="btn-vote" onClick={this.voteForSub}><i className="fas fa-star"></i> <span>Vote</span></button>
            </h3>
            <SCPlayer trackId={trackId} />
          </section>
        </>;
      } else {
        // nowPlayingSection = <div className="player-placeholder"><p>Please select a track.</p></div>;
      }
    }

    jsx = <>
      {this.context.contest.user_vote}
      <section className="contest-header">
        <h1><p>⚔️</p>{this.context.contest.title}</h1>
        <Link to={`/contest/${this.context.contest.id}#submit`} className="btn-contest-submit">Enter your submission</Link>
        <p>{this.context.contest.max_submissions - this.context.submissions.length} slots remaining</p>
      </section>
      
      {error}

      <div className="page-container">
        <Breadcrumb status={this.context.contest.status}>
          <span>Contest page</span>
        </Breadcrumb>

        {nowPlayingSection}

        {submissionsSection}
      </div>
    </>;

    return jsx;
  }
}