import React from 'react';
import AppContext from './AppContext';

export default class ContestSubmission extends React.Component {
  static contextType = AppContext;

  render() {
    let btn = <i className="far fa-play-circle btn-play" onClick={() => this.context.setSelectedSub(this.props.index)}></i>;

    if(this.context.selectedSubIndex === this.props.index) {
      btn = <img src="/img/playing.gif" alt=""></img>;
    }

    return (
      <tr className={this.context.selectedSubIndex === this.props.index ? 'sub sub-selected' : 'sub'}>
        <td className="sub-play">{btn}</td>
        <td>{this.props.submission.sc_track_name}</td>
        <td>{this.props.submission.sc_username}</td>
        <td className="sub-listened">{this.props.submission.listened 
          ? <i className="fas fa-check-circle text-success"></i> 
          : <i className="fas fa-check-circle text-muted"></i>}</td>
      </tr>
    );
  }
} 