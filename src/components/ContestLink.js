import React from 'react';
import { Link } from 'react-router-dom';
import './ContestLink.css';

export default class ContestLink extends React.Component {
  render() {
    let iconClass;
    let countSubs = parseInt(this.props.contest.count_subs),
        countVotes = parseInt(this.props.contest.count_votes);

    if(countVotes > 15) {
      iconClass = 'fa-thermometer-full text-danger';
    } else if(countVotes > 10) {
      iconClass = 'fa-thermometer-three-quarters text-warning';
    } else if(countVotes > 5) {
      iconClass = 'fa-thermometer-half text-warning';
    } else if(countVotes > 0) {
      iconClass = 'fa-thermometer-quarter text-warning';
    } else {
      iconClass = 'fa-thermometer-empty text-muted';
    }
    
    return (
      <Link to={'/contest/' + this.props.contest.id} className="contest-ongoing">
        <h3>
          <p><i className={`fas ${iconClass}`}></i> {this.props.contest.title}</p>
          <p className="contest-status">{this.props.contest.user_vote ? <i className="fas fa-vote-yea"></i> : ''}</p>
        </h3>

        <div className="stats">
          <span className="stats-count">{countSubs} submissions · {countVotes} votes</span>
        </div>
      </Link>
    );
  }
}