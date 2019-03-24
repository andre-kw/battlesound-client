import React from 'react';
import AppContext from './AppContext';

export default class ContestSubmission extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <tr className={this.context.selectedSubIndex === this.props.index ? 'sub sub-selected' : 'sub'}>
        <td className="sub-play"><i className="far fa-play-circle btn-play" onClick={() => this.context.setSelectedSub(this.props.index)}></i></td>
        <td>{this.props.submission.sc_track_name}</td>
        <td>{this.props.submission.sc_username}</td>
      </tr>
    );
  }
} 