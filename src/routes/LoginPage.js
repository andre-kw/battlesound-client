import React from 'react';
import AuthService from '../services/auth';
import TokenService from '../services/token';
import AppContext from '../components/AppContext';

export default class LoginPage extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  onLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/home';
    history.push(destination);
  }

  render() {
    return (
      <section className="login">
        {(this.state.error) ? <div className="alert">There was a problem</div> : ''}
        <div className="login-form">
          <form onSubmit={(e) => this.context.handleLoginSubmit(e, this.onLoginSuccess)}>
            <input type="text" name="username" placeholder="Username" required></input>
            <input type="password" name="password" placeholder="Password" required></input>
            <input type="submit" value="Login"></input>
          </form>
        </div>
      </section>
    );
  }
}