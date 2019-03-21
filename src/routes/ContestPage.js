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

  checkIfSelected = (id) => {
    if(typeof this.context.submissions !== 'undefined' && this.context.selectedSubIndex > -1) {
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
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {this.context.submissions.map(s => <ContestSubmission key={s.id} submission={s} isPlaying={this.checkIfSelected(s.id)} />)}
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
            </section>
          );
        } else {
          // nowPlayingSection = <div className="player-placeholder"><p>Please select a track.</p></div>;
        }
      }
    }

    jsx = <>
      <section className="contest-header">
        <h1>{this.state.contest.title}</h1>
        <Link to={`/contest/${this.state.contest.id}/submission`} className="btn-contest-submit">Enter your submission</Link>
        <p>12 slots remaining</p>
      </section>
      
      <div className="page-container">
        <div className="breadcrumb">
          <Link to="/home">Home</Link>
          <span>Ongoing contest</span>
        </div>

        {nowPlayingSection}

        {submissionsSection}
      </div>
    </>;

    return this.state.loading ? <Loader /> : jsx;
  }
}