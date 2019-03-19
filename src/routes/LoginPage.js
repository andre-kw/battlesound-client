import React from 'react';

export default class LoginPage extends React.Component {
  handleLoginSubmit = e => {
    e.preventDefault();
    const { username, password } = e.target;

    console.log('tried to log in');
  }

  render() {
    return (
      <section className="login">
        <div className="login-form">
          <form onSubmit={this.handleLoginSubmit}>
            <input type="text" name="username" placeholder="Username"></input>
            <input type="password" name="password" placeholder="Password"></input>
            <input type="submit" value="Login"></input>
          </form>
        </div>
      </section>
    );
  }
}