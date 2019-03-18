import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import './App.css';
import LandingPage from '../../routes/LandingPage/LandingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import HomePage from '../../routes/HomePage/HomePage';
import ContestPage from '../../routes/ContestPage/ContestPage';

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
