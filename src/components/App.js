import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import LoginPage from '../routes/LoginPage';
import RegisterPage from '../routes/RegisterPage';
import HomePage from '../routes/HomePage';
import ContestPage from '../routes/ContestPage';
import ContestSubmitPage from '../routes/ContestSubmitPage';
import Header from './Header';
// import { PrivateRoute, PublicOnlyRoute } from '../components/Utils';

class App extends Component {
  render() {
    return <>
      <Header />
      <main>
        <Switch>
          <Route exact path={'/login'} component={LoginPage} />
          <Route exact path={'/register'} component={RegisterPage} />
          <Route exact path={'/'} component={LandingPage} />
          <Route exact path={'/home'} component={HomePage} />
          <Route path={'/contest/:id'} component={ContestPage} />
        </Switch>
      </main>
    </>;
  }
}

export default App;
