import React from 'react';
import { Link } from 'react-router-dom';
import SC from 'soundcloud';
import { store } from '../../store';
import './ContestPage.css';
import ContestSubmission from '../../components/ContestSubmission/ContestSubmission';
import SCPlayer from '../../components/SCPlayer/SCPlayer';

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
      nowPlaying: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const contest = store.contests.find(c => id == c.id);
    const submissions = store.submissions.filter(s => id == s.contest_id);
    const nowPlaying = (submissions.length > 0) ? submissions[0] : {};
    const clientId = 'cQXBZEg50tuw0q10w3TGcKGBKADRLoOO';

    if(nowPlaying.hasOwnProperty('href')) {
      // SC.initialize({client_id: 'cQXBZEg50tuw0q10w3TGcKGBKADRLoOO'});
      fetch(`http://api.soundcloud.com/resolve?url=${nowPlaying.href}&client_id=${clientId}`)
        .then(res => res.json())
        .then(json => {
          this.setState({contest, submissions, nowPlaying: json});
        });
    }
  }

  render() {
    return (
    <>
      <h1>{this.state.contest.title}</h1>
      <section className="contest-nowplaying">
        <div className="breadcrumb">
          <Link to="/home">Home</Link>
          <span>Contest</span>
        </div>

        <h3>Now playing</h3>
        {(this.state.nowPlaying !== null) ?
          <SCPlayer trackId={this.state.nowPlaying.id}/> :
          ''
        }
      </section>


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
            {store.submissions.map(s => <ContestSubmission key={s.id} submission={s} />)}
          </tbody>
        </table>
      </section>
    </>
    );
  }
}