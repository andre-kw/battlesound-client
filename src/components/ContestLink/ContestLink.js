import React from 'react';
import { Link } from 'react-router-dom';
import './ContestLink.css';

export default class ContestLink extends React.Component {
  render() {
    return (
      <Link to={'/contest/' + this.props.contest.id} className="contest-ongoing">
        <h3>{this.props.contest.title}</h3>

        <div className="stats">
          <span className="stats-votes">{this.props.contest.total_votes} votes · {this.props.contest.total_submissions} submissions</span>
        </div>
      </Link>
    );
  }
}