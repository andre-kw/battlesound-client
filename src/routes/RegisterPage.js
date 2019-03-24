import React from 'react';
import AuthService from '../services/auth';
import AppContext from '../components/AppContext';
import { Loader } from '../components/Utils';

export default class RegisterPage extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  componentDidMount() {
    this.context.setLoading(false);
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
      this.context.setLoading(true);

      AuthService.postRegister({username, password})
        .then(res => {
          if(res.ok) {
            this.context.handleLogin({username, password}, this.onLoginSuccess)
          } else {
            throw new Error();
          }
        })
        .catch(err => {
          this.context.setLoading(false);
          this.setState({error: "Could not create user. Try a different one."});
        })
    } else {
      this.setState({error: 'Passwords do not match'});
    }
  }

  render() {
    let jsx = <>
      {this.state.error ? <div className="alert">{this.state.error}</div> : ''}

      <section className="register">
        <div className="login-form">
          <form onSubmit={(e) => this.handleRegisterSubmit(e)}>
            <input type="text" name="username" placeholder="Username" className="form-control" required></input>
            <input type="password" name="password" placeholder="Password" className="form-control" required></input>
            <input type="password" name="password_confirm" placeholder="Confirm password" className="form-control" required></input>
            <input type="submit" value="Register" className="form-control"></input>
          </form>
        </div>
      </section>
    </>;

    return this.context.loading ? <Loader /> : jsx;
  }
}