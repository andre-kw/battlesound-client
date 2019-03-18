import React from 'react';

export default class ContestSubmission extends React.Component {
  render() {
    return (
      <tr>
        <td><i className="fas fa-play-circle btn-play"></i></td>
        <td>{this.props.submission.title}</td>
        <td>{this.props.submission.username}</td>
        <td><i className="fas fa-vote-yea btn-vote"></i></td>
      </tr>
    );
  }
} 