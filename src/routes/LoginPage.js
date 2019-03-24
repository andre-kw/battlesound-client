import React from 'react';
import AppContext from '../components/AppContext';

export default class LoginPage extends React.Component {
  static contextType = AppContext;

  onLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/home';
    history.push(destination);
  }

  render() {
    return (
      <section className="login">
        {(this.context.error) ? <div className="alert">That didn't work. Try again.</div> : ''}
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