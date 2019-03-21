import React from 'react';
import AppContext from './AppContext';

export default class ContestSubmission extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <tr className={this.props.isPlaying ? 'sub sub-selected' : 'sub'}>
        <td className="sub-play"><i className="far fa-play-circle btn-play" onClick={() => this.context.setSelectedSub(this.props.submission.id)}></i></td>
        <td>{this.props.submission.title}</td>
        <td>{this.props.submission.user.username}</td>
      </tr>
    );
  }
} 