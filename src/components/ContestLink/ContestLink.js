import React from 'react';
import { Link } from 'react-router-dom';
import './ContestLink.css';

export default class ContestLink extends React.Component {
  render() {
    return (
      <Link to={'/contest/' + this.props.item.id} className="contest-ongoing">
        <h3>{this.props.item.title}</h3>

        <div className="stats">
          <span className="stats-votes">34</span>
        </div>
      </Link>
    );
  }
}