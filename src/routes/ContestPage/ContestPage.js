import React from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import './ContestPage.css';
import ContestSubmission from '../../components/ContestSubmission/ContestSubmission';

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
      }
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const contest = store.contests.find(c => id === c.id);

    this.setState(contest);
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