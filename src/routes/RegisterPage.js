import React from 'react';
import AuthService from '../services/auth';
import AppContext from '../components/AppContext';

export default class RegisterPage extends React.Component {
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

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.password_confirm.value;
    const pwdsMatch = (password === passwordConfirm);

    if(pwdsMatch) {
      AuthService.postRegister({username, password})
        .then(res => {
          this.context.handleLogin(e, this.onLoginSuccess)
        })
    } else {
      this.setState({error: 'Passwords do not match'});
    }
  }

  render() {
    return <>
      {this.state.error ? <div className="alert">{this.state.error}</div> : ''}

      <section className="register">
        <div className="login-form">
          <form onSubmit={(e) => this.handleRegisterSubmit(e)}>
            <input type="text" name="username" placeholder="Username" class="form-control" required></input>
            <input type="password" name="password" placeholder="Password" class="form-control" required></input>
            <input type="password" name="password_confirm" placeholder="Confirm password" class="form-control" required></input>
            <input type="submit" value="Register" class="form-control"></input>
          </form>
        </div>
      </section>
    </>;
  }
}