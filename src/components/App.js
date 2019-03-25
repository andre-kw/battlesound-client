import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import LoginPage from '../routes/LoginPage';
import RegisterPage from '../routes/RegisterPage';
import HomePage from '../routes/HomePage';
import ContestPage from '../routes/ContestPage';
import ContestCreatePage from '../routes/ContestCreatePage';
import { EyeCandySpeakers } from '../components/Utils';
import Header from './Header';
import AppContext from './AppContext';
// import { PrivateRoute, PublicOnlyRoute } from '../components/Utils';

class App extends Component {
  static contextType = AppContext;

  render() {
    return <>
      <div id="s-top" className={this.context.contest.id ? undefined : 'hide'}>
        <span>{'CAUTION: Entering battle field. '.repeat(15)}</span>
      </div>
      {this.context.contest.id ? <EyeCandySpeakers /> : '' }

      <main>
        <Header />
        <Switch>
          <Route exact path={'/login'} component={LoginPage} />
          <Route exact path={'/register'} component={RegisterPage} />
          <Route exact path={'/'} component={LandingPage} />
          <Route exact path={'/home'} component={HomePage} />
          <Route exact path={'/contest/create'} component={ContestCreatePage} />
          <Route path={'/contest/:id'} component={ContestPage} />
        </Switch>
      </main>
    </>;
  }
}

export default App;
