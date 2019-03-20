import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../routes/LandingPage';
import LoginPage from '../routes/LoginPage';
import HomePage from '../routes/HomePage';
import ContestPage from '../routes/ContestPage';
import Header from './Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <Header />

        <main>
          <Switch>
            <Route exact path={'/'} component={LandingPage} />
            <Route exact path={'/login'} component={LoginPage} />
            <Route path={'/home'} component={HomePage} />
            <Route path={'/contest/:id'} component={ContestPage} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;