import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isUrl from 'is-url';
import AppContext from '../components/AppContext';
import { Breadcrumb } from '../components/Utils';
import TokenService from '../services/token';
import config from '../config';

export default class ContestSubmitPage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      validUrl: false,
    };
  }

  validateUrl = (e) => {
    if(isUrl(e.target.value)) {
      this.setState({validUrl: true});
    } else {
      this.setState({validUrl: false});
    }
  }

  serializeInput = (data) => {
    return {
      sc_url: data.sc_url.value,
      contest_id: this.context.contest.id,
      user_id: this.context.userId
    };
  } 

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.setLoading(true);

    fetch(`${config.API_ENDPOINT}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(this.serializeInput(e.target))
    })
      .then(() => {
        this.props.redirect();
        this.context.setLoading(false);
      });
  }

  render() {
    return <>
      <section className="contest-header small">
        <h1><p>⚔️</p>{this.context.contest.title}</h1>
        <p>Join the fight.</p>
      </section>
      
      <div className="page-container">
        <Breadcrumb>
          <Link to={`/contest/${this.props.contestId}`}>Contest page</Link>
          <span>Submit track</span>
        </Breadcrumb>

        <section className="contest-submit">
          <p>All you need to join the contest is a link to your SoundCloud track.</p>

          <form onSubmit={this.handleSubmit}>
            <input type="text" name="sc_url" className="form-control" onKeyUp={this.validateUrl} placeholder="SoundCloud URL" autoComplete="off"></input>
            <input type="submit" className="form-control" value="Join the fight!" disabled={!this.state.validUrl}></input>
          </form>
        </section>
      </div>
    </>;
  }
}