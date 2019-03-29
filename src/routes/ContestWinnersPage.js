import React, { Component } from 'react';
import AppContext from '../components/AppContext';
import { Breadcrumb } from '../components/Utils';

export default class ContestWinnersPage extends Component {
  static contextType = AppContext;

  render() {
    return (
      <div className="page-container">
        <Breadcrumb status={this.props.status}>
          <span>Contest page</span>
        </Breadcrumb>

        <h3>Winner's circle</h3>
      </div>
    );
  }
}