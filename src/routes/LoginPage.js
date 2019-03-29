import React from 'react';
import AppContext from '../components/AppContext';
import { Alert, Loader } from '../components/Utils';

export default class LoginPage extends React.Component {
  static contextType = AppContext;

  onLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/home';
    history.push(destination);
  }

  render() {
    let jsx = (
      <section className="login">
        {(this.context.error) ? <Alert type="danger">That didn't work. Try again.</Alert> : ''}
        <div className="login-form">
          <form onSubmit={(e) => this.context.handleLoginSubmit(e, this.onLoginSuccess)}>
            <input type="text" name="username" placeholder="Username" className="form-control" required></input>
            <input type="password" name="password" placeholder="Password" className="form-control" required></input>
            <input type="submit" value="Login" className="form-control"></input>
          </form>
        </div>
      </section>
    );

    return this.context.loading ? <Loader /> : jsx;
  }
}