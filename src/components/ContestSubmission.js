import React from 'react';

export default class ContestSubmission extends React.Component {
  render() {
    return (
      <tr className={this.props.isPlaying ? 'sub-selected' : ''}>
        <td><i className="fas fa-play-circle btn-play"></i></td>
        <td>{this.props.submission.title}</td>
        <td>{this.props.submission.user.username}</td>
        <td><i className="fas fa-vote-yea btn-vote"></i></td>
      </tr>
    );
  }
} 