import React, { Component } from 'react';
import AppContext from '../components/AppContext';
import { Breadcrumb, Loader } from '../components/Utils';
import TokenService from '../services/token';
import config from '../config';

export default class ContestCreatePage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      validUrl: false,
    };
  }

  serializeInput = (data) => {
    return {
      title: data.title.value,
      creator: this.context.userId
    };
  }

  componentDidMount() {
    this.context.setLoading(false);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.setLoading(true);

    fetch(`${config.API_ENDPOINT}/contests/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(this.serializeInput(e.target))
    })
      .then(res => res.json())
      .then(json => {
        this.context.setLoading(false);
        this.redirect(json.id);
      });
  }

  redirect = (contestId) => {
    this.props.history.push(`/contest/${contestId}`)
  }

  render() {
    let jsx = <>
      <section className="contest-header small">
        <h1><p>🔫</p>Start a war</h1>
        <p>No lethal weapons allowed.</p>
      </section>
      
      <div className="page-container">
        <Breadcrumb>
          <span>Create contest</span>
        </Breadcrumb>

        <section className="contest-create">
          <p>Please fill out the form below.</p>

          <form onSubmit={this.handleSubmit}>
            <input type="text" name="title" className="form-control" placeholder="Contest title" autoComplete="off"></input>
            <input type="submit" className="form-control" value="Create contest"></input>
          </form>
        </section>
      </div>
    </>;

    return this.context.loading ? <Loader /> : jsx;
  }
}